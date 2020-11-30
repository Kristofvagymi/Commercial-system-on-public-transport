<template>
  <div class="container mt-3">
    <UserManagementComponent />
    <AdvertisementManagementComponent/>
    <PaymentsComponents />
  </div>
</template>
<script>
import UserManagementComponent from './UserManagementComponent.vue'
import AdvertisementManagementComponent from './AdvertisementManagementComponent.vue'
import PaymentsComponents from './PaymentsComponents.vue'

export default {
  components:{
    UserManagementComponent,
    AdvertisementManagementComponent,
    PaymentsComponents
  }
};
</script>