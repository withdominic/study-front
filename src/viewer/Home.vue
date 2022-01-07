<template>
  <div>
    <div>
      <v-btn color="primary" @click="onBtnExport()">Download CSV export file</v-btn>
      <v-btn color="primary" @click="onBtnSetValue()">Setting</v-btn>
      <v-btn color="primary" @click="onBtnSave()">Save</v-btn>
      <v-btn>
        <router-link to="/add" class="nav-link">Add</router-link>
      </v-btn>
    </div>
    <div style="height:10px;"></div>
    <div id="gridContainer" styl="margin: 10px;">
      <ag-grid-vue style="width: 600px; height: 500px;"
        class="ag-theme-alpine"
              id="myGrid"
              rowSelection="multiple"
              :columnDefs="columnDefs"
              @grid-ready="onGridReady"
              @cell-value-changed="onCellValueChanged"
              :defaultColDef="defaultColDef"
              :suppressExcelExport="true"
              :popupParent="popupParent"
              :getRowNodeId="getRowNodeId"
              :rowData="rowData">
      </ag-grid-vue>
    </div>
    <div style="height:10px;"></div>
    <div>
      <v-alert
        dense
        type="info"
      >
        {{alertText}}
      </v-alert>
    </div>
  </div>
</template>

<script>
import Posts from '../models/posts';
import UserService from '../services/user.service';
import PostService from '../services/post.service';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: 'Home',
  data() {
    return {
      columnDefs: [{ field: "id"  , sortable: true, maxWidth: 60},
                   { field: "title"  , sortable: true},
                   { field: "content" },
                   { field: "author" , 
                     filter: true ,
                     headerCheckboxSelection: true,
                     checkboxSelection: true,}],
      rowData: null,
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: false,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: null,
      rowData: null,
      getRowNodeId: null,
      alertText: null,
    };
  },
  components: {
    AgGridVue,
  },
  created() {
    this.getPosts();
    this.getRowNodeId = (data) => {
        return data.id;
    };    
  },
  methods: {
    getPosts() {
      UserService.getPublicContent().then(
        response => {
          this.rowData = response.data.payload;
        },
        error => {
          this.alertText =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },  
    onCellValueChanged(event) {
      this.alertText =  'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue;
      console.log(
        'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
      );
    },
    onBtnSave() {
      var selectedRows = this.gridApi.getSelectedRows();
// forEach 안에 function으로 정의해서 사용하면 prop접근이 안되어 this. 으로 접근을 못함     
//      selectedRows.forEach(function (selectedRow, index) {
//        var posts = new Posts(selectedRow.id, selectedRow.title, selectedRow.content);
//        PostService.setPostUpdate(posts);
//      });
      for(let selectedRow of selectedRows){
        var posts = new Posts(selectedRow.id, selectedRow.title, selectedRow.content);
        PostService.setPostUpdate(posts).then(
          response => {
            this.alertText = response.status;
            this.getPosts();
          },
          error => {
            this.alertText =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      };
    },
    onBtnSetValue() {
      var selectedNodes = this.gridApi.getSelectedNodes();
      selectedNodes.forEach(function (selectedNode, index) {
        selectedNode.setDataValue('title', '새 제목' + selectedNode.id);
      });
    },
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