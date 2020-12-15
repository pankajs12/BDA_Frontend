<template>
<nuxt-child />
</template>
<<script>
export default {
  name:'VdpPageView',
  mounted() {
            this.$store.set('navigation/show_side_nav' , false)
  },
}
</script>
