<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <div style="margin: 10px 0;">
        <button v-on:click="onBtnExport()">Download CSV export file</button>
    </div>
    <div style="flex: 1 1 0; position: relative;">
      <div id="gridContainer">
        <ag-grid-vue style="width: 450px; height: 500px;"
          class="ag-theme-alpine"
                id="myGrid"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :suppressExcelExport="true"
                :popupParent="popupParent"
                :rowData="rowData">
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: 'Home',
  data() {
    return {
      columnDefs: [{ field: "title"  , sortable: true},
                   { field: "author" , filter: true},],
      rowData: null,
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: null,
      rowData: null,
    };
  },
  components: {
    AgGridVue,
  },
  created() {
    this.popupParent = document.body;
    UserService.getPublicContent().then(
      response => {
        this.rowData = response.data.payload;
      },
      error => {
        this.rowData =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
 methods: {
    onBtnExport() {
      this.gridApi.exportDataAsCsv();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
 }
};
</script>