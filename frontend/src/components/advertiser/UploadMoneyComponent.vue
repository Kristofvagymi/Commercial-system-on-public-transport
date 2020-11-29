<template>
  <div>
    <b-card header-tag="header">
      <template #header>
        <h5 class="mb-0">Upload Money</h5>
      </template>
      <b-form inline>
        <label class="mr-sm-2" for="form-money">Amount of money:</label>
        <b-form-input
          v-model="money"
          id="form-money"
          class="mb-2 mr-sm-2 mb-sm-0 w-25"
          type="number"
          min="1000"
        />
        <div class="float-right">
          <b-button variant="primary" class="float-right" @click="uploadMoney">Upload</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import Swal from "sweetalert2";

var tokenInHeader = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
};

export default {
  data() {
    return {
      jwt: "",
      money: 1000,
    };
  },
  created: () => {
   console.log(localStorage.getItem("jwt"))
  },
  methods: {        
    async uploadMoney() {
      console.log("UPLOAD")
      try {
        await this.$http.post(
          "/user/uploadMoney",
          {
            amount: Number(this.money),
          },
          tokenInHeader
        );        
        this.$parent.$parent.user.money += Number(this.money)
        this.money = 1000
      } catch (err) {
        Swal.fire("Error", err.response.data.error, "error");
      }
    },
  }
};
</script>