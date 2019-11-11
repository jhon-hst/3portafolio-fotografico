<template>
<dir></dir>
    <!-- <div>
        <div v-show="!look">
            <a href="https://www.facebook.com/" class="social" ref="facebook">Facebook</a> <br>
            <a href="https://www.instagram.com" class="social" ref="instagram">instagram</a> <br>
            <a href="https://twitter.com/" class="social" ref="twitter">twitter</a> <br>
            <a href="https://www.youtube.com/" class="social" ref="youtube">youtube</a>
        </div>
        <div v-show="look">
            <p>Facebook</p>
            <input type="text" class="form-control" v-model="facebook">
            <br>
            <p>Instagram</p>
            <input type="text" class="form-control" v-model="instagram">
            <br>
            <p>Twitter</p>
            <input type="text" class="form-control" v-model="twitter">
            <br>
            <p>Youtube</p>
            <input type="text" class="form-control" v-model="youtube">
        </div>
    </div> -->
</template>

// <script>
// export default {
//     // a los props hay que especificarle que es lo que est llegando, array, objetos, string, etc
//     props: {
//         look: Boolean,
//     },
//     data() {
//         return {
//             facebook: '',
//             instagram: '',
//             twitter: '',
//             youtube: ''
//         }
//     },
//     watch: {
//         // n: nuevo dato, el qie esta llegando nuevo
//         // v: viejo dato: el que tenia
//         look(n, v) {
//            this.activateUpdate()
//         }
//     },
//     methods:{
//     // para activar los campos de actualización de datos
//         activateUpdate(){
//             this.facebook = this.$refs.facebook.href
//             this.instagram = this.$refs.instagram.href
//             this.twitter = this.$refs.twitter.href
//             this.youtube = this.$refs.youtube.href
//         }
//     }
// }
// </script>

