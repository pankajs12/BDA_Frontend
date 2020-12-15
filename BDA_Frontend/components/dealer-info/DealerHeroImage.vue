<template>
<v-img height="450" cropped :src="image"></v-img>
</template>

<script>
  export default {
    name:'DealerHeroImage',
    props: {
      image: {
        type: String,
        default: 'https://ddc1.s3.amazonaws.com/JhCPQvZo5VHQtVmyPW8D2dBr6LovSRcOO-1v%2Br4GbWWaQqRTzczNFR3klA%3D%3D/CDy2BvBgoiXPo024/Vm3pWg%3D%3D/MzWhIOx3/header.jpg'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
