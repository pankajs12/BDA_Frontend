<template>
  <v-breadcrumbs id="mainBreadCrumbs" :items="breadcrumbs">
    <template v-slot:item="{ item }">

      <v-breadcrumbs-item>
        <nuxt-link :to="item.href">
          <v-icon v-show="item.icon" left>
            {{ item.icon }}
          </v-icon>
          {{ item.name }}
        </nuxt-link>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'bread-crumbs',

  data () {
    return {}
  },
  computed: {
    breadcrumbs () {
      return this.$store.get('navigation/route_meta')
    }
  },
  mounted () {}
}
</script>
<style>
#mainBreadCrumbs a {
  color: rgb(156, 156, 156);
}
#mainBreadCrumbs li.v-breadcrumbs__divider {
  padding: 0em 0.3em !important;
}
</style>
<style lang="scss" scoped>
ul.v-breadcrumbs {
  padding: 0 0;
}
li.v-breadcrumbs__divider {
  padding: 0em 0.3em !important;
}
</style>
