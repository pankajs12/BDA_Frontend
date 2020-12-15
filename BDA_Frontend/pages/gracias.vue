<template>
<div style="height:300px;">
        <h1 style="text-align:center; margin-top:100px; background-color:floralwhite">{{message}}</h1>
        <div style="justify-content: center; background-color:floralwhite;">
        <v-btn block color="#019cf7" dark exact text to="/" nuxt><h3>De vuelta a casa</h3>
      </v-btn>
        </div>
</div>
</template>

<script>
export default {
     name: 'thankyou',
    data () {
        return {
            message: 'Gracias por contactar con nosotras.'
        }
    },
}
</script>

<style>

</style>