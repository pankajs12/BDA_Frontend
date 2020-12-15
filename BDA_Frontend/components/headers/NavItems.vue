<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <!-- <q-btn stretch to="/" flat text-color="black" label="Pagina de Inicio" />
    <q-btn stretch to="/busqueda" flat text-color="black" label="Búsqueda" /> -->
    <q-btn
      stretch
      to="/concesionarios"
      flat
      text-color="black"
      label="Concesionarios"
    />
       
    <q-btn stretch flat text-color="black" label="Blog" />
    <q-btn
      flat
      @click="toggleNav"
      aria-label="Menu"
      icon="menu"
      class="q-mr-sm"
      text-color="black"
    />
  </div>
</template>

<script>
export default {
  name: "NavItems",
  props: ["leftDrawerOpen"],
  methods: {
    toggleNav: function() {
      this.$emit("toggleNav");
    }
  }
};
</script>

<style lang="scss" scoped></style>
