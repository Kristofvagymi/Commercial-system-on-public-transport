<template>
  <div>
    <b-card header-tag="header">
      <template #header>
        <h5 class="mb-0">Create Advertisement</h5>
      </template>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <div class="row">
          <div class="col-6">
            <b-form-group label="Image:" label-for="input-1">
              <b-form-file
                id="input-1"
                v-model="form.image"
                placeholder="Choose a picture or drop it here..."
                drop-placeholder="Drop file here..."
                accept=".jpg, .png"
                required
              ></b-form-file>
              <div class="mt-3" v-if="form.image != null">
                <i>Selected file:</i> {{ form.image.name }}
              </div>
            </b-form-group>
          </div>
          <div class="col-3">
            <b-form-group label="From:" label-for="input-2">
              <b-form-select
                id="input-2"
                v-model="form.from"
                :options="hours"
                required
              ></b-form-select>
            </b-form-group>
          </div>
          <div class="col-3">
            <b-form-group label="To:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="form.to"
                :options="hours"
                required
              ></b-form-select>
            </b-form-group>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-6">
              <label for="input-4">Vehicles:</label>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <b-form-select
                id="input-4"
                v-model="pickedRegNumber"
                :options="vehicles"
                required
              ></b-form-select>
            </div>
            <div class="col-2">
              <b-button
                @click="addVehicles()"
                variant="primary"
                class="float-right"
                >Add vehicle</b-button
              >
            </div>
          </div>
          <div class="row mt-2" v-if="form.regNumbers.length != 0">
            <div class="col">
              <i>Selected vehicles:</i> {{ form.regNumbers.join(", ") }}
            </div>
          </div>
        </div>

        <div class="mt-3">
          <b-button type="submit" variant="primary"
            >Create Advertisement</b-button
          >
          <b-button type="reset" variant="danger" class="ml-3">Reset</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { Bus } from "@/bus.js";

export default {
  data() {
    return {
      user: {},
      form: {
        from: null,
        to: null,
        image: null,
        regNumbers: [],
      },
      hours: [
        { text: "Pick an hour", value: null },
        { text: "1:00", value: 1 },
        { text: "2:00", value: 2 },
        { text: "3:00", value: 3 },
        { text: "4:00", value: 4 },
        { text: "5:00", value: 5 },
        { text: "6:00", value: 6 },
        { text: "7:00", value: 7 },
        { text: "8:00", value: 8 },
        { text: "9:00", value: 9 },
        { text: "10:00", value: 10 },
        { text: "11:00", value: 11 },
        { text: "12:00", value: 12 },
        { text: "13:00", value: 13 },
        { text: "14:00", value: 14 },
        { text: "15:00", value: 15 },
        { text: "16:00", value: 16 },
        { text: "17:00", value: 17 },
        { text: "18:00", value: 18 },
        { text: "19:00", value: 19 },
        { text: "20:00", value: 20 },
        { text: "21:00", value: 21 },
        { text: "22:00", value: 22 },
        { text: "23:00", value: 23 },
        { text: "24:00", value: 24 },
      ],
      vehicles: [{ text: "Pick a vehicle", value: null }],
      pickedRegNumber: null,
      show: true,
      tokenInHeader: {},
    };
  },
  created: function () {
    this.tokenInHeader = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    this.fetchVehicles();
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      if (this.form.regNumbers != null && this.form.regNumbers.length == 0) {
        Swal.fire("Error", "Do not forget to add countries", "error");
      } else if (this.form.from >= this.form.to) {
        Swal.fire(
          "Error",
          "Invalid time range. 'To' must be greater than 'from'",
          "error"
        );
      } else {
        try {
          console.log(this.form);
          const formData = new FormData();
          formData.append("file", this.form.image);
          formData.append(
            "ad",
            JSON.stringify({
              regNumbers: this.form.regNumbers,
              from: {
                hours: this.form.from,
              },
              to: {
                hours: this.form.to,
              },
              fileName: this.form.image.name,
            })
          );
          await this.$http.post(
            "/admin-advertisement",
            formData,
            this.tokenInHeader
          );
          Bus.$emit("refreshAdvertisements");
          this.onReset();
        } catch (err) {
          Swal.fire("Error", err.response.data.error, "error");
        }
      }
    },
    async fetchVehicles() {
      try {
        let response = await this.$http.get("/vehicle/vehicles", this.tokenInHeader);
        for (const vehicle of response.data.vehicles) {
          this.vehicles.push({
            text:
              vehicle.registrationNumber +
              " (" +
              vehicle.countries.join(", ") +
              ")",
            value: vehicle.registrationNumber,
          });
        }
      } catch (err) {
        Swal.fire("Error", err.response.data.error, "error");
      }
    },
    addVehicles() {
      if (
        this.pickedRegNumber !== null &&
        !this.form.regNumbers.includes(this.pickedRegNumber)
      ) {
        this.form.regNumbers.push(this.pickedRegNumber);
      }
    },
    onReset() {
      // Reset our form values
      this.form.from = null;
      this.form.to = null;
      this.form.regNumbers = [];
      this.pickedRegNumber = null;
      this.form.image = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>