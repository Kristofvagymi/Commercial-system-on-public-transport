<template>
  <div>
    <h3>My advertisements</h3>
    <b-table hover :items="advertisements" :fields="fields">
    </b-table>
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
      fields: [
        { key: "title" },
        { key: "appearanceLeft" },
      ],
      advertisements: [],
    };
  },
  created: function () {
    this.fetchAdvertisements();
  },
  methods: {
    async fetchAdvertisements() {
      try {
        let response = await this.$http.get(
          "/advertisement/getAdvertisementsByUser",
          tokenInHeader
        );
        console.log(response.data)
        this.advertisements = response.data.advertisements;
      } catch (err) {
        Swal("Error", err.response.data.error, "error");
      }
    },
  }
};
</script>