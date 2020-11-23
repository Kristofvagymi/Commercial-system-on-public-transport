<template>
  <div class="signinbox">
    <b-form @submit.prevent="loginUser()">
      <h3>Sign In</h3>

      <b-form-group label="Username">
        <b-form-input required v-model="login.username"/>
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input type="password" required v-model="login.password"/>
      </b-form-group>

      <b-button type="submit" variant="primary" class="w-100 btn-dark">
        Sign In
      </b-button>
    </b-form>
  </div>
</template>

<script>
import './assests/login.css'
import swal from "sweetalert";

export default {
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          this.$router.push("/dashboard");
        }
      } catch (err) {
        swal("Error", err.response.data.error, "error");
      }
    }
  }
};
</script>
