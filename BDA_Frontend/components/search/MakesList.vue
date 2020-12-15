<template>

    <v-list>
      <v-list-item-group v-model="vehicleMakes" color="primary">
        <v-list-item
           v-for="make in vehicleMakes"
          :key="make"
          :to="`/busqueda/${condition}/${make}`" nuxt>
        <v-list-item-title>{{make}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>
<script>


export default {
  name: 'makes-list',
  props: ['condition'],
  data () {
    return {
      vehicleMakes: [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Daewoo",
  "Daihatsu",
  "Dodge",
  "Eagle",
  "Ferrari",
  "FIAT",
  "Fisker",
  "Ford",
  "Freightliner",
  "Genesis",
  "Geo",
  "GMC",
  "Honda",
  "HUMMER",
  "Hyundai",
  "INFINITI",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Maybach",
  "MAZDA",
  "McLaren",
  "Mercedes-Benz",
  "Mercury",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Panoz",
  "Plymouth",
  "Pontiac",
  "Porsche",
  "Ram",
  "Rivian",
  "Rolls-Royce",
  "Saab",
  "Saturn",
  "Scion",
  "smart",
  "SRT",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo"
]

    }
  },
}
</script>

<style lang="scss" scoped>

</style>
