<template>
  <div class="mt-3">
    <div class="container">
      <MyAdvertisementsComponent />
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-sm">
          <CreateAdvertisementsComponent />
        </div>
        <div class="col-sm">
          <InfoComponent/>
          <UploadMoneyComponent class="mt-4"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CreateAdvertisementsComponent from "./CreateAdvertisementsComponent.vue";
import MyAdvertisementsComponent from "./MyAdvertisementsComponent";
import UploadMoneyComponent from "./UploadMoneyComponent";
import InfoComponent from "./InfoComponent";

export default {
  components: {
    CreateAdvertisementsComponent,
    MyAdvertisementsComponent,
    UploadMoneyComponent,
    InfoComponent
  },
};
</script>