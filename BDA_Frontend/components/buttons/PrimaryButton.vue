<template>
  <v-btn
    width="100%"
    :size="size"
    type="button"
    ripple
    :align="align"
    :loading="submitting"
    class="btn-fixed-width"
    :to="link"
    :style="{ backgroundColor, color: fontColor, width, height, fontSize }"
  >
  {{label}}
  </v-btn>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    vehicle: {
      type:Object ,
      default: ()=> {

      }
    },
    fontSize: {
      type: String,
      default: "1rem"
    },
    height: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: "inherit"
    },
    size: {
      type: String,
      default: "md"
    },
    label: {
      type: String,
      default: ''
    },
    emitter: {
      type: String,
      default: null
    },
    align: {
      type: String,
      default: "center"
    },
    icon: {
      default: null,
      type: String
    },
    backgroundColor: {
      type: String,
      default: "#1d73be"
    },
    iconRight: {
      type: String,
      default: null
    },
    iconLeft: {
      type: String,
      default: null
    },
    toggleSidebar: {
      type: Boolean,
      default: false
    },
    fontColor: {
      type: String,
      default: "#ffffff"
    },
    link: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      test: "",
      submitting: false
    };
  },

  methods: {
    performButtonsAction: function() {
      if (this.toggleSidebar) {
        this.$store.commit("srpPageStore/updateDrawerState");
      }
      // const sidebarStatus = !this.$store.state.srpPageStore.showRightSidebar;
    }
  }
};
</script>

<style lang="scss" scoped></style>
