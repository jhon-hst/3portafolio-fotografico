<template>
    <form class="theform" role="form">
        <!-- form -->
        <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="name" />
            <label>Descripción corta</label>
            <input type="text" class="form-control"  v-model="descriptionShort"/>
            
            <br>
            <!-- botones de borrar categorias -->
            <div v-show="showSelectCategories">
                <button 
                    class="btn btn-primary" 
                    v-for="data in categoriesSelect" 
                    :key="data" @click.prevent="removeCategory(data)">
                    {{data}}
                </button>
            </div>
            <!-- select de categorias -->
            <select v-model="selectCategory" class="form-control">
                <option value="default">Seleccione categorias</option>
                <option v-for="(reason, key) in dataCategory" 
                        :value="reason.name"
                        :key="key" >
                    {{reason.name}}
                </option>
            </select>
            
            <br>
            <!-- botones de etiquetas -->
            <div v-show="showSelectLabels">
                <button 
                class="btn btn-danger" 
                v-for="data in labelsSelect" 
                :key="data"
                @click.prevent="removeLabel(data)">
                    {{data}}
                </button>
            </div>
            <!-- select de etiquetas -->
            <select v-model="selectLabel" class="form-control"> 
                <option value="default">Seleccione etiquetas</option>
                <option v-for="(reason, key) in dataLabel" 
                        :value="reason.name"
                        :key="key">
                    {{reason.name}}
                </option>
            </select>
            <br>
            <!-- <listLabel> -->
                <!-- me traigo todo el componente pero como slot="listlabels" que es el mismo nombre que tiene el slot del componente este se sobrepone sobre ese y luego con un display none lo oculto para optener solo el contenido que necesito, pero solo uso como practica ya que no me sirve para lo que necesito -->
                <!-- <select slot="listlabels" class="d-none">

                </select>
            </listLabel> -->

            <label>Descripción larga</label>
            <textarea type="textarea" rows="4"  class="form-control"  v-model="descriptionlong"/>
            <br>
            <label> Url del banco de imagenes</label>
            <input type="text" class="form-control"  v-model="urlBancoImages" >
        </div>
        <label for="photo">Incluya una imagen</label>
        <div class="drag-drop" v-bind:style="{ background: activeColor}" >
            <!-- <input type="file" multiple="multiple" id="photo" /> -->
            <input type="file" name="image" @change="getImage" accept="image/*">
            <span class="fa-stack fa-2x">
                <i class="fa fa-cloud fa-stack-2x bottom pulsating"></i>
                <i class="fa fa-circle fa-stack-1x top medium"></i>
                <i class="fa fa-arrow-circle-up fa-stack-1x top"></i>
            </span>
            <span class="desc">{{viewNameImage}}</span>
        </div>
        <button class="btn btn-primary" @click.prevent="uploadImage">Enviar</button>
        <button type="reset" class="btn btn-danger">Cancelar</button>
        <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="{ width: progressUpload + '%'}">
            </div>
        </div>
    </form>
        
</template>
<script>

import controller from '../../../firebase/db/controller'
// import listLabel from './create-labels'
import getData from './mixin'
import Swal from 'sweetalert2'

const instance = new controller 


export default {
    data(){
        return {
            name: '',
            descriptionShort: '',
            descriptionlong: '',
            // listCategorias: '',
            dataCategory: null,
            dataLabel: null,
            selectCategory: 'default',
            selectLabel: 'default',
            categoriesSelect: [],
            labelsSelect: [],
            showSelectCategories: false,
            showSelectLabels: false,
            image: null,
            loading: '',
            progressUpload: 0,
            url: '',
            ifSuccess: '',
            viewNameImage: 'Pulse aquí para añadir archivos',
            activeColor: 'red',
            urlBancoImages: ''
        }
    },
    components: {
    //   listLabel  
    },
    methods: { 
        // una ves se carga una imagen openemos parte de sus metadatos
        getImage(event){
            this.image = event.target.files[0]
            this.viewNameImage = this.image.name
            this.activeColor = 'blue'
        },
        //una ves le damos enviar en this.loading vamos a optener su progreso y los watch en this.loading hacemos lo que sigue, aqui no sirve usar asycn await ya que no tendria el dato que necesito que es el tiempo de carga 
        uploadImage() {
            // validamos que todos los capos esten llenos
            if(
                this.image == null ||
                this.name == '' ||
                this.descriptionShort == '' ||
                this.descriptionlong == '' ||
                this.urlBancoImages == '' ||
                this.categoriesSelect.length == 0 ||
                this.labelsSelect.length == 0
            ){
                Swal.fire({
                    position: 'center',
                    type: 'error',
                    title: 'No puede enviarse algun campo vacío',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }else{
                this.loading = instance.uploadImageController(this.image)
            }
        },
        // enviar la imagen, esta se activa desde los watch una ves se optenga la url
        async submit(url) {
            const data = await instance.createImage(
                this.name,
                this.descriptionShort,
                this.descriptionlong,
                this.categoriesSelect,
                this.labelsSelect,
                url,
                this.image.name,
                this.urlBancoImages
            )
            // console.log(data)
            // una ves se optenga el id de la imagen y datos que se envio se activa este watch ifSuccess
            this.ifSuccess = data
        },
    },
    watch:{
        // para detectar el porcentaje de subida de la imagen, el on es una funcion de firebase en this.progressUpload se va guardando el porcentaje
        loading(){
            this.loading.on('state_changed', sp => {
                this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                },
                err => {//en caso de error
                    console.log('algo salio mal al cargar' + err.message)
                },
                () => {//una ves finalize la subida del archivo
                    this.loading.snapshot.ref
                    .getDownloadURL()
                    .then(url => {//optenemos los datos
                        // console.log(url)
                        this.submit(url)
                        // sessionStorage.setItem('newImage', url)
                    })
                    .catch(err => {//en caso de error porcen
                        Swal.fire({
                            position: 'center',
                            type: 'error',
                            title: 'error al subir la imagen recargue la página e intente de nuevo',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log('no se pudo optener la url ' + err)
                    })
                }
            )
        },
       // si todo se subio de manera exitosa has esto, para devolver la barra de progreso una ves termine de subir
        ifSuccess() {
            if(this.progressUpload >= 100){
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Se subió imagen con éxito',
                    showConfirmButton: false,
                    timer: 1500
                })

                // devolvemos todos loscampos a vacíos
                this.progressUpload = 0
                this.image = '' //este no me funciona no queda vacío
                this.name = '' 
                this.descriptionShort = '' 
                this.descriptionlong = '' 
                this.categoriesSelect.length = 0 
                this.labelsSelect.length = 0
            }
        },
    },
    mounted() {
        // this.$bus.$on('listCategories', (data) => { // para practicar con el bus de eventos, en la carpeta de plugin y en main.js se hacen una configuraciones
        //     this.listCategorias = data
        //     console.log(data)
        // })
    },
    // trae los datos de los select
    mixins: [getData],
}
</script>


<style lang="scss" scoped>
/* Estilo del área del input[file] */
.drag-drop {
height: 8em;
width: 8em;
background-color: #ccc;
border-radius: 4em;
text-align: center;
color: white;
position: relative;
margin: 0 auto 1em;
}
 
.drag-drop span.desc {
display: block;
font-size: .7em;
padding: 0 .5em;
color: #000;
}
 
input[type="file"] {
height: 10em;
opacity: 0;
position: absolute;
top: 0;
left: 0;
width: 100%; 
z-index: 3;
}
 

/* Estilo del área del input[file] con :hover */
 
.drag-drop:hover, input[type="file"]:hover {
background-color: #3276b1;
cursor: pointer;
}
 
.drag-drop:hover span.desc {
color: #fff;
} 
 

/* Composición del icono de Upload con FontAwesome */
.fa-stack { margin-top: .5em; }
 
.fa-stack .top { color: white; }
 
.fa-stack .medium { 
color: black;
text-shadow: 0 0 .25em #666;
}
 
.fa-stack .bottom { color: rgba(225, 225, 225, .75); }

.drag-drop:hover .pulsating {
animation: pulse1 1s linear infinite;
animation-direction: alternate ;
-webkit-animation: pulse1 1s linear infinite;
-webkit-animation-direction: alternate ;
}
 
/* Keyframing de la animación */
 
@keyframes pulse1 {
0% { color: rgba(225, 225, 225, .75); }
50% { color: rgba(225, 225, 225, 0.25); }
100% { color: rgba(225, 225, 225, .75); }
}
 
@-moz-keyframes pulse1 {
0% { color: rgba(225, 225, 225, .75); }
50% { color: rgba(225, 225, 225, 0.25); }
100% { color: rgba(225, 225, 225, .75); }
}
 
@-webkit-keyframes pulse1 {
0% { color: rgba(225, 225, 225, .75); }
50% { color: rgba(225, 225, 225, 0.25); }
100% { color: rgba(225, 225, 225, .75); }
}
 
@-ms-keyframes pulse1 {
0% { color: rgba(225, 225, 225, .75); }
50% { color: rgba(225, 225, 225, 0.25); }
100% { color: rgba(225, 225, 225, .75); }
}
</style>

