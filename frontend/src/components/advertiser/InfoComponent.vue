<template>
  <div>
    <b-card header-tag="header">
      <template #header>
        <h5 class="mb-0">Info</h5>
      </template>
      Current balance: <b>{{ this.$parent.$parent.user.money }} HUF </b><br>
      One appearance costs: <b>1000 HUF</b>
    </b-card>
  </div>
</template>
<script>
export default {
};
</script>