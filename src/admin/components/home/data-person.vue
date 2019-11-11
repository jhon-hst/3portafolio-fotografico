<template>
    <div>
        <img class="banner"  :src="banner" alt="">
        <img class="photo"  :src="photo" alt="">
       <button class="btn btn-danger buttom" v-show="look" @click="cancelar">Cancelar</button>
       <button class="btn btn-primary buttom" @click="activateUpdate">{{textButtom}}</button>
        <div class="row">
            <div class="col-6">
                <div v-show="look">
                    <p >Banner</p>
                    <input class="form-control" type="text" name="" v-model="banner">
                    <br>
                    <p>Foto</p>
                    <input class="form-control" type="text" name="" v-model="photo">
                    <br><br>
                </div>
                <p>Nombre: <span ref="name" v-show="!look">{{name}}</span></p>
                <input type="text" class="form-control" v-show="look" v-model="name" >
                <br>
                <p>Profesión: <span ref="profession" v-show="!look" >
                    {{profession}}</span></p>
                <input type="text" class="form-control" v-show="look" v-model="profession">
                <br>
                <p>Descripción profesional: <span ref="descriptionPerson" v-show="!look">{{descriptionProfessional}}</span></p>
                <textarea name="" id="" cols="30" rows="4" class="form-control" v-show="look" v-model="descriptionProfessional" ></textarea>
                <br>
                <p>Descripcíon personal: <span ref="desicriptionPrefessional" v-show="!look">{{descriptionPersonal}}</span></p>
                <textarea name="" id="" cols="30" rows="4" class="form-control" v-show="look" v-model="descriptionPersonal" ></textarea> 
                <br><br>
            </div>

            <!-- redes sociales -->
            <div class="col-6">
                <div v-show="!look">
                    <a :href="facebook" class="social" >Facebook</a> <br>
                    <a :href="instagram" class="social">instagram</a> <br>
                    <a :href="twitter" class="social">twitter</a> <br>
                    <a :href="youtube" class="social">youtube</a> <br>
                    <a :href="whatsapp" class="social">WhatsApp</a>
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
                    <p>WhatsApp</p>
                    <input type="text" class="form-control" v-model="whatsapp">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Controller from '../../../firebase/db/controller'
import Swal from 'sweetalert2'


const instance = new Controller

export default {
    data() {
        return{
            look: false,
            textButtom: 'Modificar',
            banner: '',
            descriptionPersonal: '',
            descriptionProfessional: '',
            facebook:  '',
            instagram: '',
            name:  '',
            photo:  '',
            profession: '',
            twitter:  '',
            youtube: '',
            whatsapp: '',
            getData: [],
            data: null,
            allInfo: null

        }
    }, 
    // hacemos la peticion ded los datos
    async mounted(){
        this.getData = await instance.getDataPerson()
    },
    watch:{
        getData(){
            // como la respuesta llega como de dos formas primera detecta un cambio y llega un resultado extraño, pero a los milisegundos si llega como es, es una cuestion de sincronia q a un no logreo resolver, por eso pregunto if(this.getData[0]) es decir si no esta nuo o undefine que es como llega al principio, y a los milisegundos si llega true, de esta manera no sale error
            if(this.getData[0]){
                this.data = this.getData[0]
                this.readData(this.data)
            }
        }
    },

    methods:{
        // agregamos los datos a su campo correspondiente
        readData(data){
            this.banner = data.banner
            this.descriptionPersonal = data.descriptionPersonal
            this.descriptionProfessional = data.descriptionProfessional
            this.facebook = data.facebook
            this.instagram = data.instagram
            this.name = data.name
            this.photo = data.photo
            this.profession = data.profession
            this.twitter = data.twitter
            this.youtube = data.youtube
            this.whatsapp = data.whatsapp
        },
        // para realizar la modificacion
        async activateUpdate(){
            if(!this.look){
                this.textButtom = 'Actualizar'
                this.look = true
            }else if(this.textButtom = 'Actualizar'){

                // para verificar de que no se valla un campo vacío
                if(
                    this.banner == '' ||
                    this.descriptionPersonal == '' ||
                    this.descriptionProfessional == '' ||
                    this.facebook == '' ||
                    this.instagram == '' ||
                    this.name == '' ||
                    this.photo == '' ||
                    this.profession == '' ||
                    this.twitter == '' ||
                    this.youtube == '' ||
                    this.whatsapp == '' 
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
                this.allInfo = {
                    banner: this.banner,
                    descriptionPersonal: this.descriptionPersonal,
                    descriptionProfessional: this.descriptionProfessional,
                    facebook:  this.facebook,
                    instagram: this.instagram,
                    name:  this.name,
                    photo:  this.photo,
                    profession: this.profession,
                    twitter:  this.twitter,
                    youtube: this.youtube,
                    whatsapp: this.whatsapp
                }
                // console.log(this.allInfo )
                const update = await instance.updateDataPerson(this.allInfo)
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
                        position: 'center',
                        type: 'error',
                        title: 'Algo salio mal al actualizar, revise su conexión a internet',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                this.look = false
                this.textButtom = 'Modificar'
            }
        },
        async cancelar(){
            this.look = false
            this.textButtom = 'Modificar'
            this.getData = await instance.getDataPerson() //para devolver todo a su estado normal
        }
    }
}
</script>

<style lang="scss" scoped>
    .photo{
        width: 200px;
        position: relative;
        bottom: 100px;  
        left: 30px;
        border-radius: 50%;
    }
    .buttom{
        float: right;
        margin-top: 20px;
        margin-right: 60px;
    }
    .banner{
        width: 100%;
        height: 300px;
    }
</style>

