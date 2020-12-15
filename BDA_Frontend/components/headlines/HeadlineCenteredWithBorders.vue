<template>
  <span id="headlineWithBorders" class="text-center">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "HeadlineCenteredWithBorders",
  props: {
    text: {
      default: null,
      type: String
    }
  }
};
</script>

<style lang="scss" scoped></style>
