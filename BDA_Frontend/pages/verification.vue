<template>
<div style="height:300px;">
        <!-- <h1 style="text-align:center; margin-top:100px; background-color:floralwhite">verification</h1> -->
</div>
</template>

<script>
import axios from 'axios';
export default {
     name: 'verification',
    data () {
        return {
            verification_id:""
        }
    },
     mounted() {
        this.verification_id = this.$route.query.id;
        console.log('verification id',this.$route.query.id);
        axios.post(`${process.env.BACKEND_API}/verify`, {
            id: this.verification_id
            })
            .then(res => {
                console.log('result', res.status);
                const status = res.status;
                if (status == 200) {
                    this.$toast.success('Email has been successfully verified');
                    setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 5000);
                }
            })
            .catch(e => {
                console.error(e);
                console.log('response status',e.response.status);
                if(e.response.status == 404){
                    this.$toast.error('Email has not been verified');
                    setTimeout( () => window.location.href = '/', 5000);
                }
                else if(e.response.status == 304){
                    this.$toast.error('Request is from unknown resource');
                    setTimeout( () => window.location.href = '/', 5000);
                }
                
            })    
    }
}
</script>

<style>

</style>



