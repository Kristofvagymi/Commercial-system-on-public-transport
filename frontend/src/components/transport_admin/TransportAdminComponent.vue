<template>
  <div class="mt-3">
    <div class="container">
      <AdvertisementListComponent />
      <CreateAdminAdvertisementComponent />
    </div>
  </div>
</template>
<script>
import CreateAdminAdvertisementComponent from './CreateAdminAdvertisementComponent.vue'
import AdvertisementListComponent from './AdvertisementListComponent.vue'

export default {
  components:{
    AdvertisementListComponent,
    CreateAdminAdvertisementComponent
  }
};

</script>