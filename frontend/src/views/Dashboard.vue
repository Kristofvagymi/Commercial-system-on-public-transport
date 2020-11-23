<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand" href="#">Public transport advertising system</span>
        <span style="color:white;">{{ user.username }}</span>
        <b-link @click="logUserOut()">Logout</b-link>
      </div>
    </nav>

    <section>
        <AdvertiserComponent v-if="user.role == 'advertiser'"/>
        <CommercialAdminComponent v-else-if="user.role == 'commercial_admin'"/>
        <TransportAdminComponent v-else-if="user.role == 'transport_admin'"/>
    </section>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";

import AdvertiserComponent from '@/components/advertiser/AdvertiserComponent.vue';
import CommercialAdminComponent from '@/components/commercial_admin/CommercialAdminComponent.vue';
import TransportAdminComponent from '@/components/transport_admin/TransportAdminComponent.vue';

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    }
  },

  created() {
    this.getUserDetails();
    console.log(this.user)
  },
  components:{
    AdvertiserComponent,
    CommercialAdminComponent,
    TransportAdminComponent
  }
};
</script>

<style scoped></style>
