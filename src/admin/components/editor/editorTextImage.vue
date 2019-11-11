<template>
    <div>
        <h1 class="text-center">Home</h1>
        <button class="btn btn-primary" @click="openInputs">{{textButtom}}</button>
        <button class="btn btn-danger" v-show="show" @click="cancelar">Cancelar</button>
        <div class="row">
            <div class="col-6">
                <p ref="firstText">{{firstText}}</p>
                <input type="text" class="form-control" v-show="show" v-model="firstText">
                <br>
                <p ref="secondText">{{secondText}}</p>
                <textarea v-show="show" cols="30" rows="4" class="form-control" v-model="secondText"></textarea>
                <br>
                <p ref="thirdText">{{thirdText}}</p>
                <input type="text" class="form-control" v-show="show" v-model="thirdText">
            </div>
            <div class="col-6">
                <img class="img" ref="firstImage" :src="firstImage" alt="">
                <br><br>
                <input type="text" class="form-control"  v-show="show"   v-model="firstImage">
            </div>
        </div>
        <!-- //about -->
        <h1 class="text-center mt-5">Sobre mí</h1>
        <div class="row">
            <div class="col-6">
                <p ref="firstText">{{firstTextAbout}}</p>
                <input type="text" class="form-control" v-show="show" v-model="firstTextAbout">
                <br>
                <p ref="secondText">{{secondTextAbout}}</p>
                <textarea v-show="show" cols="30" rows="4" class="form-control" v-model="secondTextAbout"></textarea>
                <br>
                <p ref="thirdText">{{thirdTextAbout}}</p>
                <input type="text" class="form-control" v-show="show" v-model="thirdTextAbout">
            </div>
            <div class="col-6">
                <img class="img" ref="firstImage" :src="firstImageAbout" alt="">
                <br><br>
                <input type="text" class="form-control"  v-show="show"   v-model="firstImageAbout">
            </div>
        </div>
        <br><br>
    </div>
</template>

<script>
import Controller from '../../../firebase/db/controller'
import Swal from 'sweetalert2'

const instance = new Controller


export default {
    data(){
        return{
            show: false,
            firstText: '',
            secondText: '',
            thirdText: '',
            firstImage: '',
            firstTextAbout: '',
            secondTextAbout: '',
            thirdTextAbout: '',
            firstImageAbout: '',
            textButtom: 'modificar',
            getData: [],
            allInfo: {}
        }
    },
      // hacemos la peticion ded los datos
    async mounted(){
        this.getData = await instance.getContentWeb()
    },
    watch:{
        // activamos apenas recibimos los datos
        getData(){
            if(this.getData[0]){
                this.data = this.getData[0]
                this.readData(this.data)
            }
        }
    },
    methods:{
        // se asignan los datos a su campo correspondiente
        readData(data){
            this.firstText = data.firstText
            this.secondText = data.secondText
            this.thirdText = data.thirdText
            this.firstImage = data.firstImage
            this.firstTextAbout = data.firstTextAbout
            this.secondTextAbout = data.secondTextAbout
            this.thirdTextAbout = data.thirdTextAbout
            this.firstImageAbout = data.firstImageAbout
        },
        // enviamos los datos
        async openInputs() {
            // se abren los inputs y se cambio el nombre del boton, para que cuando le demos click otra ve este mande los datos
            if(!this.show){
                this.show = true
                this.textButtom = 'Actualizar'
            } else if( this.textButtom == 'Actualizar'){ // mo arriba los datos se cambiaron del boton ahora se enviaran los dadtos
                
                // para en caso de que algun dato se valla vacío
                if( 
                    this.firstText == '' ||
                    this.secondText == '' ||
                    this.thirdText == '' ||
                    this.firstImage == '' ||
                    this.firstTextAbout == '' ||
                    this.secondTextAbout == '' ||
                    this.thirdTextAbout == '' ||
                    this.firstImageAbout == ''
                ){
                    Swal.fire({
                        position: 'center',
                        type: 'error',
                        title: 'No puede enviarse algun campo vacío',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return
                }

                // guardamos los datos a enviar dentro de este objeto
                this.allInfo = {
                    firstText: this.firstText,
                    secondText: this.secondText,
                    thirdText: this.thirdText,
                    firstImage: this.firstImage,
                    firstTextAbout: this.firstTextAbout,
                    secondTextAbout: this.secondTextAbout,
                    thirdTextAbout: this.thirdTextAbout,
                    firstImageAbout: this.firstImageAbout
                }
                // mandadme a realizar la actualización
                const update = await instance.updateContentWeb(this.allInfo)
                if(update){
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Actualizado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if(!update){
                    Swal.fire({
                        position: 'top-end',
                        type: 'error',
                        title: 'Algo salio mal al actualizar, revise su conexión a internet',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                this.show = false
                this.textButtom = 'Modificar'
            }
        },
        // para cancelar el update
        async cancelar(){
            this.show = false
            this.textButtom = 'Modificar'
            this.getData = await instance.getContentWeb() // para que todo a como estaba
        }
    }
}
</script>
<style lang="scss" scoped>
    .img {
        width: 400px;
    }
</style>

