<template>
        <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="(hour, key)  in hours" :key="key">
          <td>{{$t(`days.${key}`)}}</td>
            <td>{{hour}}</td>
        </tr>
      </tbody>
    </template>
              </v-simple-table>
</template>

<script>
  export default {
    name:'BusinessHours',
    props: {
      hours: {
        type: Object,
        default: ()=> {
          return {
          Monday: '8:00 am - 9:00 pm',
          Tuesday: '8:00 am - 9:00 pm',
          Wednesday: '8:00 am - 9:00 pm',
          Thursday: '8:00 am - 9:00 pm',
          Friday: '8:00 am - 9:00 pm',
          Saturday: '8:00 am - 9:00 pm',
          Sunday: '8:00 am - 9:00 pm',
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
