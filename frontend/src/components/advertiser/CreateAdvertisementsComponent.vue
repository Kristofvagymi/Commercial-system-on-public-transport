<template>
  <div>
    <b-card header-tag="header">
      <template #header>
        <h5 class="mb-0">Create Advertisement</h5>
      </template>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group label="Title:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            required
            placeholder="Enter the advertisement's title"
          ></b-form-input>
        </b-form-group>

        <div>
          <div class="row">
            <div class="col">
              <b-form-group label="From:" label-for="input-2">
                <b-form-select
                  id="input-2"
                  v-model="form.from"
                  :options="hours"
                  required
                ></b-form-select>
              </b-form-group>
            </div>
            <div class="col">
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
        </div>

        <div>
          <div class="row">
            <div class="col">
              <label for="input-4">Countries:</label>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <b-form-select
                id="input-4"
                v-model="pickedCountry"
                :options="countries"
                required
              ></b-form-select>
            </div>
            <div class="col-4">
              <b-button
                @click="addCountry()"
                variant="primary"
                class="float-right"
                >Add country</b-button
              >
            </div>
          </div>
          <div class="row mt-2" v-if="form.countries.length != 0">
            <div class="col">
              <i>Selected countries:</i> {{ form.countries.join(", ") }}
            </div>
          </div>
        </div>

        <b-form-group label="Image:" label-for="input-4" class="mt-3">
          <b-form-file
            id="input-5"
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

        <div>
          <div class="row">
            <div class="col">
              <label for="input-4">Number of appearances:</label>
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              <b-form-input
                v-model="form.appearances"
                type="number"
                required
                min="1"
              ></b-form-input>
            </div>
            <div class="col-4">
              <b-form-group class="mt-1">
                <b-form-checkbox v-model="form.isSubscription"
                  >Subscription</b-form-checkbox
                >
              </b-form-group>
            </div>
            <div class="col-6">
              <div
                class="float-right mt-1"
                v-bind:class="{
                  'text-danger':
                    this.$parent.$parent.user.money < form.appearances * 1000,
                }"
              >
                Total cost:
                <b
                  >{{ form.appearances * 1000 }} HUF{{
                    form.isSubscription ? "/month" : ""
                  }}</b
                >
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <b-button
            type="submit"
            variant="primary"
            :disabled="
              this.$parent.$parent.user.money < form.appearances * 1000
            "
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

var tokenInHeader = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
};

export default {
  data() {
    return {
      user: {},
      form: {
        title: "",
        from: null,
        to: null,
        countries: [],
        image: null,
        appearances: 1,
        isSubscription: false,
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
      countries: [
        { text: "Pick a country", value: null },
        "Pest",
        "Baranya",
        "Somogy",
        "Vas",
        "Zala"
      ],
      pickedCountry: null,
      show: true,
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      if (this.form.countries != null && this.form.countries.length == 0) {
        Swal.fire("Error", "Do not forget to add countries", "error");
      } else if (this.form.from >= this.form.to) {
        Swal.fire(
          "Error",
          "Invalid time range. 'To' must be greater than 'from'",
          "error"
        );
      } else {
        try {
          const formData = new FormData();
          formData.append("file", this.form.image);
          formData.append(
            "ad",
            JSON.stringify({
              title: this.form.title,
              appearances: this.form.appearances,
              countries: this.form.countries,
              isSubscription: this.form.isSubscription,
              from: {
                hours: this.form.from,
              },
              to: {
                hours: this.form.to,
              },
              fileName: this.form.image.name
            })
          );
          await this.$http.post(
            "/advertisement",
            formData,
            tokenInHeader
          );
          Bus.$emit("refreshMyAdvertisements")
          this.$parent.$parent.user.money -= this.form.appearances * 1000
          this.onReset()
        } catch (err) {
          Swal.fire("Error", err.response.data.error, "error");
        }
      }
    },
    addCountry() {
      if (
        this.pickedCountry !== null &&
        !this.form.countries.includes(this.pickedCountry)
      ) {
        this.form.countries.push(this.pickedCountry);
      }
    },
    onReset() {
      // Reset our form values
      this.form.title = "";
      this.form.from = null;
      this.form.to = null;
      this.form.countries = null;
      this.form.image = null;
      this.form.appearances = 1;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>