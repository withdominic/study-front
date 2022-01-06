<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <ValidationObserver ref="formValidate">
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <validation-provider rules="required" v-slot="{ errors }">
            <input
              v-model="user.email"
              type="text"
              class="form-control"
              name="email"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>              
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <validation-provider rules="required" v-slot="{ errors }">
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              name="password"
            />
            <span>{{ errors[0] }}</span>
          </validation-provider>              
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  setup() {
    // Define a validation schema
    const simpleSchema = {
      email(value) {
        // validate email value and return messages...
      },
      name(value) {
        // validate name value and return messages...
      },
    };
    // Create a form context with the validation schema
    useForm({
      validationSchema: simpleSchema,
    });
    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');
    return {
      email,
      emailError,
      password,
      passwordError,
    };
  },
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$refs.formValidate.validate().then(isValid => {
        if (!isValid) {
          this.loading = false;
          this.message = '입력이 누락되었습니다.';
          return;
        }

        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });  
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>