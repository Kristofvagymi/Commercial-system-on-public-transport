<template>
  <div class="mt-5">
    <h3>Advertisement management</h3>
    <b-table :items="advertisments" :fields="fields" :tbody-tr-class="rowClass">
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
        {{ data.item.appearanceLeft }}
        {{ data.item.isSubscription ? "/month" : "" }}
      </template>
      <template #cell(actions)="data">
        <b-button
          class="mr-2"
          style="float: right"
          variant="danger"
          @click="deleteAdvertisement(data.item._id)"
        >
          Delete
        </b-button>
      </template>
      <template #cell(user)="data">
        {{
          data.item.createdBy.username +
          " " +
          (data.item.createdBy.blocked ? " [BLOCKED] " : "") +
          ""
        }}
      </template>
    </b-table>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { Bus } from "@/bus.js";

export default {
  data() {
    return {
      fields: [
        { key: "advertisement" },
        { key: "title" },
        { key: "user" },
        { key: "appearanceLeft" },
        { key: "time_range" },
        { key: "countries" },
        { key: "actions" },
      ],
      advertisments: [],
      tokenInHeader: {},
    };
  },
  created: function () {
    this.tokenInHeader = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    this.fetchAdvertisements();
    this.listenToEvents();
  },
  methods: {
    async fetchAdvertisements() {
      try {
        let response = await this.$http.get(
          "/advertisement/advertisements",
          this.tokenInHeader
        );
        this.advertisments = response.data.advertisements;
      } catch (err) {
        Swal.fire("Error", err.response.data.error, "error");
      }
    },

    async deleteAdvertisement(_id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await this.$http.delete("/advertisement/" + _id, this.tokenInHeader);
              await this.fetchAdvertisements();
            } catch (err) {
              throw new Error(err.response.data.error);
            }
            Swal.fire("Deleted!", "", "success");
          }
        })
        .catch((err) => {
          Swal.fire("Error", err.message, "error");
        });
    },

    rowClass(item, type) {
      if (item && type === "row" && item.createdBy.blocked === true) {
        return "blocked";
      } else {
        return "null";
      }
    },

    listenToEvents() {
      //eslint-disable-next-line
      Bus.$on("refreshAdvertisements", ($event) => {
        this.fetchAdvertisements();
      });
    },

    getImageUrl(id) {
      return `http://localhost:8090/advertisement/${id}/preview`;
    },
  },
};
</script>

<style>
.blocked {
  background-color: #ededed;
}
</style>