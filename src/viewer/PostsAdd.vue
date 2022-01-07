<template>
<div>
    <validation-observer
        ref="observer"
        v-slot="{ invalid }"
    >
        <form @submit.prevent="submit">
            <validation-provider
                v-slot="{ errors }"
                name="Title"
                rules="required|max:20"
            >
                <v-text-field
                v-model="posts.title"
                :counter="20"
                :error-messages="errors"
                label="제목"
                required
                ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="Content"
                rules="required|max:40"
            >
                <v-text-field
                v-model="posts.content"
                :counter="40"
                :error-messages="errors"
                label="내용"
                required
                ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="Author"
                rules="required|max:10"
            >
                <v-text-field
                v-model="posts.author"
                :counter="10"
                :error-messages="errors"
                label="작성자"
                required
                ></v-text-field>
            </validation-provider>

            <v-btn
                class="mr-4"
                type="submit"
                :disabled="invalid">submit</v-btn>
            <v-btn 
                @click="clear">clear</v-btn>
            <v-btn>
                <router-link to="/home" class="nav-link">글 취소</router-link></v-btn>
        </form>
    </validation-observer>
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
  import PostService from '../services/post.service';
  import { required, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data() {
        return {
            posts: new Posts(0, '', '', ''),
            alertText: null,
        };
    },

    methods: {
      submit () {
        const result = this.$refs.observer.validate();
        if(result){
            PostService.setPostAdd(this.posts).then(
                response => {
                    this.alertText = response.status;
                },
                error => {
                    this.alertText =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                }
            )    
        }
      },
      clear () {
        this.posts.title = '';
        this.posts.content = '';
        this.posts.author = '';
        this.$refs.observer.reset();
      },
    },
  }
</script>