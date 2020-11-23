<template>
  <div class="signinbox">
    <b-form>
      <h3>Sign In</h3>

      <b-form-group label="Username">
        <b-form-input required/>
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input type="password" required />
      </b-form-group>

      <b-button type="submit" variant="primary" class="w-100 btn-dark">
        Sign In
      </b-button>
    </b-form>
  </div>
</template>

<script>

import './assests/login.css'

export default {
  name: "Login",
};
</script>

<style>
</style>
