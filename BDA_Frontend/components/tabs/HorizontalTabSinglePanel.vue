<template>
  <q-tab-panel>
    <component :is="component"></component>
  </q-tab-panel>
</template>

<script>
export default {
  name: "horizontal-tab-single-panel",
  props: ["component"]
};
</script>

<style lang="scss" scoped></style>
