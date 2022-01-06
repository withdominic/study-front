<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <div style="margin: 10px 0;">
        <input type="file" @change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">        
    </div>
    <div style="flex: 1 1 0; position: relative;">
        <v-data-table
        dense
        :headers="headers"
        :items="contents"
        :items-per-page="10"
        class="elevation-1"
        ></v-data-table>  
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
  name: 'Home',
  data() {
    return {
        headers: [
            {
                text: '순번',
                align: 'start',
                sortable: false,
                value: 'A',
                width: 60 
            },
            { text: '검체번호' , value: 'B', width: 200},
            { text: '검체채취일' , value: 'C', width: 120 },
            { text: '주민번호' , value: 'D', width: 150 },
            { text: "이름" , value: 'E', width: 150 },
            { text: "휴대폰번호" , value: 'F', width: 120 },
            { text: "생년월일" , value: 'G', width: 120 },
            { text: "성별" , value: 'H', width: 100 },
            { text: "연령대" , value: 'I', width: 120 },
            { text: "체온" , value: 'J', width: 80 },
            { text: "검사방법" , value: 'K', width: 150 }
        ],
      contents:[], 
    };
  },
  components: {
  },
  methods: {
    readFile(event) { 
        const file = event.target.files[0];
        let reader = new FileReader();
        let tmpResult = {};        
        
        // if you use "this", don't use "function(e) {...}" 
        reader.onload = (e) => { 
            let data = reader.result;
            let workbook = XLSX.read(data, {type: "binary"});            

            // get prased object 
            workbook.SheetNames.forEach(function(sheetName) { 
                const roa = XLSX.utils.sheet_to_json(
                     workbook.Sheets[sheetName], 
                     { range: 1, header: "A" } 
                ); 
                if (roa.length) tmpResult = roa; 
            }); 
            this.contents = tmpResult; 
        }; 
        reader.readAsBinaryString(file); 
    }
  }  
};
</script>