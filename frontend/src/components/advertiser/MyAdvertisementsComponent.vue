<template>
  <div>
    <h3>My advertisements</h3>
    <b-table hover :items="advertisements" :fields="fields">
      <template #cell(advertisement)="data">
        <b-img-lazy :src="getImageUrl(data.item._id)"></b-img-lazy>
      </template>
      <template #cell(time_range)="data">
        {{ data.item.from.hours + ":00 - " + data.item.to.hours + ":00" }}
      </template>
      <template #cell(countries)="data">
        {{ data.item.countries.join(", ") }}
      </template>
      <template #cell(appearanceLeft)="data">
        {{ data.item.appearanceLeft}} {{ data.item.isSubscription ? "/month" : ""}}
      </template>
    </b-table>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { Bus } from "@/bus.js";

var tokenInHeader = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
};

export default {
  data() {
    return {
      fields: [
        { key: "advertisement" },
        { key: "title" },
        { key: "appearanceLeft" },
        { key: "time_range" },
        { key: "countries" },
      ],
      advertisements: [],
    };
  },
  created: function () {
    this.fetchAdvertisements();
    this.listenToEvents();
  },
  methods: {
    async fetchAdvertisements() {
      try {
        let response = await this.$http.get(
          "/advertisement/getAdvertisementsByUser",
          tokenInHeader
        );
        this.advertisements = response.data.advertisements;
      } catch (err) {
        Swal.fire("Error", err.response.data.error, "error");
      }
    },

    getImageUrl(id) {
      return `http://localhost:8090/advertisement/${id}/preview`;
    },

    listenToEvents() {
      //eslint-disable-next-line
      Bus.$on("refreshMyAdvertisements", ($event) => {
        this.fetchAdvertisements();
      });
    },
  },
};
</script>