<template>
  <div class="container mt-3">
    <UserManagementComponent />
    <AdvertisementManagementComponent/>
  </div>
</template>
<script>
import UserManagementComponent from './UserManagementComponent.vue'
import AdvertisementManagementComponent from './AdvertisementManagementComponent.vue'

export default {
  components:{
    UserManagementComponent,
    AdvertisementManagementComponent
  }
};
</script>