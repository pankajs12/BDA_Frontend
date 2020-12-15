<template>
    <v-row id="vColors">
    <v-col cols="6" class="py-0">
      <v-row align="center">
         <v-badge
         text
          color="white"
          icon="mdi-vuetify"
        >
        Exterior Color
      <template v-slot:badge>
   <em v-if="!hasExteriorColor" class="no_color_available colorIcon" style="background:black">
          </em>
          <em v-else class="colorIcon" :style="{backgroundColor: exteriorColor}"></em>
      </template>
        </v-badge>
      </v-row>
    </v-col>
       <v-col cols="6" class="py-0">
      <v-row align="center">
         <v-badge
         text
          color="white"
          icon="mdi-vuetify"
        >
        Interior Color
      <template v-slot:badge>
   <em v-if="!hasInteriorColor" class="no_color_available colorIcon" style="background:#f7f7f7">
          </em>
          <em v-else class="colorIcon" :style="{backgroundColor: interiorColor}"></em>
      </template>
        </v-badge>
      </v-row>
    </v-col>
       <!-- <v-col cols="6" class="py-0">
      <v-row align="center">
        <v-col cols="9" class="text-right">
          Int color
        </v-col>
            <v-spacer/>
        <em v-if="!hasExteriorColor" class="no_color_available colorIcon">
              <v-icon>mdi-circle-off-outline</v-icon>
          </em>
          <em v-else class="colorIcon" :style="{backgroundColor: exteriorColor}"></em>
      </v-row>
    </v-col> -->

      <!-- <v-row align="center" class="justify-space-around">
        <v-col cols="6" class="py-0">
          <v-row align="end">
          <v-col>
          <p class="overline mb-2">Exterior Color</p>
          </v-col>
          <v-spacer/>
          <v-col>
            <em v-if="!hasExteriorColor" class="no_color_available colorIcon">
              <v-icon>mdi-circle-off-outline</v-icon>
          </em>
          <em v-else class="colorIcon" :style="{backgroundColor: exteriorColor}"></em>
          </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="py-0">
          <v-row align="end">
          <v-col>
          <p class="overline mb-2">Interior <br/>Color</p>
          </v-col>
          <v-spacer/>
          <v-col>
            <em v-if="!hasInteriorColor" class="no_color_available colorIcon">
              <v-icon>mdi-circle-off-outline</v-icon>
          </em>
          <em v-else class="colorIcon" :style="{backgroundColor: interiorColor}"></em>
          </v-col>
          </v-row>
        </v-col>
      </v-row> -->
      <!-- </v-col> -->
    </v-row>
</template>

<script>
export default {
  name: "VehicleColors",
  props: {
    interiorColor: {
      default: "",
      type: String
    },
    exteriorColor: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      hasInteriorColor: false,
      hasExteriorColor: false
    }
  },
  mounted() {
    if(this.interiorColor !== ''){
        this.hasInteriorColor = true;
    }
     if(this.exteriorColor !== ''){
        this.hasExteriorColor = true;
    }
  },
};
</script>

<style lang="css" scoped>

em.colorIcon {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    line-height: 25px;
    display: block;
    border: 2px solid
    #d9d9d9;
}
.overline {
    line-height: 1.1em !important;
}
.colorIcon.no_color_available {
    background: #f3f3f3;
    text-align: center;
}
.v-badge__badge.deep-purple.accent-4 {
    margin-left: 30px;
    right: -40px;
}

.no_color_available.colorIcon::before {
border-right: 2px solid #d9d9d9;
width: 2px;
height: 22px;
margin-top: -1px !important;
margin-left: 9px;
display: block;
-webkit-transform: rotate(33deg);
transform: rotate(35deg);
content: "";
}
</style>
<style>

#vColors .v-badge__badge {
    right: -34px !important;
    top: -5px !important;
}
</style>
