<template>
    <nav class="navbar fixed-top navbar-dark bg-dark">
        <router-link :to="{ name: 'home'}">
            <p :style="{color:'white'}">Ir al sitio web</p>
        </router-link>
    </nav>
</template>
<script>


export default {
    data(){
        return{
            user: ''
        }
    },
    methods:{
        // para salir de la autentificación

        // reintentar(){
        //     this.user = firebase.auth().currentUser
        //     console.log(this.user)
        // },
    },
    // mounted(){
    //     this.user = firebase.auth().currentUser
    // },
    // watch:{
    //     user(){
    //         if(this.user){
    //             console.log(this.user)
    //         }else{
    //             setTimeout(()=>{
    //                 this.reintentar()
    //             },1000)
    //         }
    //     }
    // }
}
</script>


