<template>
  <div>
    <h3>Payment report</h3>
    <b-table hover :items="payments" :fields="fields">
    </b-table>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      fields: [],
      payments: [],
      tokenInHeader: {},
    };
  },
  created: function () {
    this.tokenInHeader = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    this.fetchPayments();
  },
  methods: {
    async fetchPayments() {
      try {
        let response = await this.$http.get(
          "/advertisement/payments",
          this.tokenInHeader
        );
        console.log(response.data)
        this.payments = response.data;
      } catch (err) {
        Swal.fire("Error", err.response.data.error, "error");
      }
    },
  },
};
</script>