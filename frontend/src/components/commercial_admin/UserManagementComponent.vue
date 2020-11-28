<template>
  <div>
    <h3>User management</h3>
    <b-list-group :key="user.id" v-for="user in users">
      <b-list-group-item
        class="d-flex justify-content-between align-items-center m-1"
        :class="{ blocked: user.blocked }"
      >
        <div>
          <b>{{ user.username }}</b
          >, money: {{ user.money }}
        </div>
        <b-button
          v-if="!user.blocked"
          variant="danger"
          @click="blockUser(user.username)"
          >Block user</b-button
        >
        <b-button v-else variant="success" @click="enableUser(user.username)"
          >Enable user</b-button
        >
      </b-list-group-item>
    </b-list-group>
    <b-list-group-item
      class="d-flex justify-content-between align-items-center m-1"
    >
      <b-form inline>
        <b>Add user:</b> 
        <b-form-input
          class="m-1 mr-3 ml-3"
          placeholder="Username"
          v-model="newUser.username"
          required
        ></b-form-input>

        <b-form-input
          class="m-1"
          placeholder="Password"
          v-model="newUser.password"
          required
        ></b-form-input>
      </b-form>
      <b-button variant="primary" @click="createUser()">Register</b-button>
    </b-list-group-item>
  </div>
</template>
<script>
import swal from "sweetalert";
import { Bus } from "@/bus.js";

var tokenInHeader = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
};

export default {
  data() {
    return {
      users: [],
      newUser: {
        username: "",
        password: ""
      }
    };
  },
  created: function () {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        let response = await this.$http.get("/user/users", tokenInHeader);
        this.users = response.data.users;
      } catch (err) {
        swal("Error", err.response.data.error, "error");
      }
    },

    async blockUser(username) {
      try {
        await this.$http.post(
          "/user/blockUserByName",
          {
            username: username,
          },
          tokenInHeader
        );
        await this.fetchUsers();
        Bus.$emit("refreshAdvertisements")
      } catch (err) {
        swal("Error", err.response.data.error, "error");
      }
    },

    async enableUser(username) {
      try {
        await this.$http.post(
          "/user/enableUserByName",
          {
            username: username,
          },
          tokenInHeader
        );
        await this.fetchUsers();
        Bus.$emit("refreshAdvertisements")
      } catch (err) {
        swal("Error", err.response.data.error, "error");
      }
    },
    
    async createUser() {
      try {
        let response = await this.$http.post(
          "/user/createUser",
          {
            username: this.newUser.username,
            password: this.newUser.password
          },
          tokenInHeader
        );
        console.log(response)
        await this.fetchUsers();
      } catch (err) {
        swal("Error", err.response.data.error, "error");
      }
    },
  },
};
</script>

<style scoped>
.blocked {
  background-color: #ededed;
}
</style>