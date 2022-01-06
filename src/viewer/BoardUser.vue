<template>
  <div class="container">
<!--    <b-table striped hover :items="contents"></b-table> -->
    <v-data-table
      dense
      :headers="headers"
      :items="contents"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>  
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'User',
  data() {
    return {
        headers: [
          {
            text: 'Id',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: '사용자이름', value: 'username' },
          { text: 'Email', value: 'email' },
          { text: '수정일시', value: 'modifiedDate' },
        ],
        contents: []
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      response => {
        this.contents = response.data.payload;
        console.log(this.contents);
      },
      error => {
        this.contents =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>