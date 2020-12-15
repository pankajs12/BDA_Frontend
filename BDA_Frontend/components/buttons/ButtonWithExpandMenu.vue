<template>
  <q-btn :label="label">
    <q-menu fit anchor="center middle" self="center middle">
      <q-item clickable v-for="link in links" :key="link.label">
        <q-item-section>{{ link.label }}</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  name: "ButtonWithExpandMenu",
  props: {
    links: {
      type: Array,
      default: function() {
        return [
          {
            label: "link 1",
            path: "http://yta.com"
          },
          {
            label: "link 2",
            path: "http://yta.com"
          },
          {
            label: "link 3",
            path: "http://yta.com"
          }
        ];
      }
    },
    label: {
      type: String,
      default: "menu button"
    }
  }
};
</script>

<style lang="scss" scoped></style>
