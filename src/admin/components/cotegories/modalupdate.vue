<!-- template for the modal component -->
<template>
  <div>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Modificar Imagen
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
               <form class="form" action="">
                  <div>
                      <img :src="url" width="300"  alt="" ><br>
                  </div>
                  <div class="form-group">
                    <input type="file" class="form-control" @change="getNewImage" >
                    <label for="recipient-name" class="col-form-label">Cambiar imagen</label>
                  </div>
                  <div class="progress">
                      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="{ width: progressUpload + '%'}">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="recipient-name" class="col-form-label">titulo</label>
                      <input type="text" class="form-control" v-model="name">
                  </div>
                  <div class="form-group">
                      <label for="recipient-name" class="col-form-label">Descripción corta</label>
                      <input type="text" class="form-control" v-model="descriptionShort">
                  </div>

                  <br>
                  <!-- botones de borrar categorias -->
                  <div v-show="showSelectCategories">
                      <button 
                          class="btn btn-primary" 
                          v-for="info in categoriesSelect" 
                          :key="info" @click.prevent="removeCategory(info)">
                          {{info}}
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
                      v-for="info in labelsSelect" 
                      :key="info"
                      @click.prevent="removeLabel(info)">
                          {{info}}
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
                  <div class="form-group">
                      <label for="message-text" class="col-form-label">Url del banco de imagenes</label>
                      <input class="form-control" type="text" v-model="urlBancoImages">
                  </div>
                  <br>
                  <div class="form-group">
                      <label for="message-text" class="col-form-label">Descripción larga</label>
                      <textarea class="form-control" rows="4" v-model="descriptionLong"></textarea>
                  </div>
              </form>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-primary" @click="alertUpdate">
                Acualizar
              </button>
              <button class="btn btn-danger" @click="$emit('close')">
                Cancelar
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
 </div>
</template>

<script>
import getData from '../create/mixin'
import Controller from '../../../firebase/db/controller'
import Swal from 'sweetalert2'

const instance = new Controller

export default {
  data(){
    return{
      name: this.data.name,
      descriptionShort: this.data.descriptionShort,
      descriptionLong: this.data.descriptionLong,
      categoriesSelect: this.data.listCategories,
      labelsSelect: this.data.listLabels,
      url: this.data.url,
      nameImage: this.data.nameImage,
      urlBancoImages: this.data.urlBancoImages,
      dataCategory: null,
      dataLabel: null,
      selectCategory: 'default',
      selectLabel: 'default',
      showSelectCategories: true,
      showSelectLabels: true,
      newImage: null,
      loading: '',
      progressUpload: 0,
      allInfo: null
    }
  },
  props:{
    data: Object
  },
  methods:{
    // si se va a cambiar la imagen se realiza estos cambios
    getNewImage(event){
      // Creamos el objeto de la clase FileReader
      let reader = new FileReader();

      // Leemos el archivo subido y se lo pasamos a nuestro fileReader
      reader.readAsDataURL(event.target.files[0]);

      // Le decimos que cuando este listo ejecute el código interno
      const self = this //dentro de la funcion el this cambia por eso lo defino antes
      reader.onload = function(){

        // agregamos la url interna del pc al marca src para que aparesca una previsualizacion 
        self.url = reader.result
      }

      this.newImage = event.target.files[0]
      this.nameImage = this.newImage.name
    },
    //optenemos los datos para enviar a la actualización
    alertUpdate(event) {
      const name = this.name
      const descriptionShort = this.descriptionShort
      const descriptionLong = this.descriptionLong
      const categoriesSelect = this.categoriesSelect
      const labelsSelect = this.labelsSelect
      const nameImage = this.nameImage
      const id = this.data.id
      const newImage = this.newImage
      const urlBancoImages = this.urlBancoImages
      const beforeNameImage = this.data.nameImage //tambien se envia el nombre de la imagen viaja para eliminarla, si es que se va a cambiar la imagen
      const url = this.data.url

      this.allInfo = {
        name,
        descriptionShort, 
        descriptionLong, 
        categoriesSelect, 
        labelsSelect,  
        nameImage, 
        id, 
        newImage,
        urlBancoImages, 
        beforeNameImage
      }
      // verificamos que no se valla un campo vacío
      if(
        this.allInfo.name == '' ||
        this.allInfo.descriptionShort == '' || 
        this.allInfo.descriptionLong == '' || 
        this.allInfo.categoriesSelect == '' || 
        this.allInfo.labelsSelect == '' ||  
        this.allInfo.nameImage == '' || 
        this.allInfo.urlBancoImages == '' ||
        this.allInfo.id == '' || 
        this.allInfo.newImage == '' || 
        this.allInfo.beforeNameImage == '' 
      ){
        Swal.fire({
            position: 'center',
            type: 'error',
            title: 'No pueden a ver campos vacíos',
            showConfirmButton: false,
            timer: 1500
        })
        return
      }
      
      this.update(this.allInfo, url)
    },
    // mandamos a realizar la modificación
    async update(allInfo, url){
      //  preguntamos se this.newImage tiene contenido debido a que si esta null es por que no se va a modificar la imagen y no seria necesarios borrar y resubir la imagen, pero si por lo contrario tiene contenido entonces si se borra la imagen y se sube la nueva
      if(this.newImage != null){
        this.loading = instance.uploadImageController(this.newImage)
        await instance.deleteImage(allInfo.beforeNameImage, null)
      }else{
        //si esta vacío this.newImage llama directamnete a  this.updateData
        this.updateData(allInfo, url)
      }
    },
    // hace la actualización de los datos, tener en cuenta que si this.newImage tiene contenido updateData() se llamara desde el watch loading() ya qu viene con contenido nuevo como el nombre y la url
    async updateData(allInfo, url){
      const infoUpdate = await instance.updateImage(allInfo, url)
      if(infoUpdate){
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Imagen modificada con exito',
            showConfirmButton: false,
            timer: 1500
        })
      }
      this.$emit('close')
    }
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
                    // console.log('subio este es el link' ,url)
                    this.updateData(this.allInfo, url)
                    this.progressUpload = 0
                    this.newImage = null
                    // sessionStorage.setItem('newImage', url)
                })
                .catch(err => {//en caso de error porcen
                    console.log('no se pudo optener la url ' + err)
                })
            }
        )
    }
  },
  // los metodos y wacth estan el el mixin
    mixins: [getData],

}
</script>

<style lang="scss" scoped>

.modal-mask {
  
  position: fixed;
  z-index: 1001;
  top: 25px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  overflow-y: scroll;
  height: 400px;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

