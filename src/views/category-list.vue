<template>
  <div class="body-gallery">
    <div class="loading" :style="{display: displayLoading}">
        <Loading/>
    </div>
    <div class="menu" :style="{display: displayGallery}">
        <Menu/>
    </div>

    <!-- images list -->
    <div class="container-fluid" :style="{display: displayGallery}">
      <h1 class="text-center title">{{stringTest}}</h1>

      <div class="gallery-image">
        <div class="img-box img" v-for="(reason, key) in list" :key="key" >
          <img :src="reason.url" alt="" />
          <div 
            class="transparent-box" 
            @click="selectImage(reason.url, reason.name, reason.descriptionShort, reason.urlBancoImages)" 
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <div class="caption">
              <p>{{reason.name}}</p>
              <p class="opacity-low">{{reason.descriptionShort}}</p>
            </div>           
          </div> 
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <img class="img-fluid imagen-modal" :src="urlImage" alt="" data-toggle="modal" data-target="#exampleModalCenter">
            <div class="info-modal">
              <p class=" mt-3 mb-1">{{imgName}}</p>
              <p class=" mb-1">{{descriptionShort}}</p>
              <a style="font-family: 'arial'" :href="urlBancoImages" class="mb-1 link" target="_blank">Ver o descargar en alta calidad</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { setTimeout } from 'timers';
import Controller from '../firebase/db/controller'

import Menu from '@/components/menu'
import Loading from '@/components/loading'

const instance = new Controller

export default {
    data(){
        return{
            displayLoading: 'block',
            displayGallery: 'none',
            id: null,
            list: [],
            urlImage: '',
            imgName: '',
            descriptionShort: '',
            urlBancoImages: ''
        }
    },
    components:{
        Menu,
        Loading
    },
    mounted(){
      this.loading()
    },
    created: function(){ 
      // se optiene el id por la url)
      this.id = this.$route.params.id
    }, 
  
    methods:{
        // traer todas las imagenes dependiendo del id
        async getImage(){
          this.list = await instance.getByCategory(this.id)
        },
        // como estoy usando el key para los numeros del carausel pero stos comienzan en 0 y el carausel necesita que empiezen de 1
        num(key){
          return key + 1;
        },
        // la url de la imagen para el modal
        selectImage(url, name, descriptionShort, urlBancoImages){
          this.urlImage = url
          this.imgName = name
          this.descriptionShort = descriptionShort
          this.urlBancoImages = urlBancoImages
        },
        // para la animacion de la carga antes se que salga todo
        loading(){
          this.displayLoading = 'block'
          this.displayGallery = 'none'
          setTimeout(() => {
              this.displayLoading = 'none'
              this.displayGallery = 'block'
          },1000)
        }
    },
    watch:{
      // para cada ves que cambie el id de la url traiga las nuevas images
      id(){
        this.getImage()
        this.loading()
      }
    },
    computed:{
      // para detectar cada ves que cambia la url
      stringTest() {
        this.id = this.$route.params.id
        return this.id
      },
    },

}
</script>

<style lang="scss">

.link{
  text-decoration: none;
  color: white;
}
.link:hover{
  text-decoration: none;
  color: red;
}

.body-gallery{
  background-color: rgb(0, 0, 0);
  min-height: 100vh; 
  font-family: 'Viga', sans-serif; 
}

.title{
  text-transform: uppercase;
  // position: relative;
  padding-top: 50px;
  
  color: white;
  font-size: 1.7em;
}
.imagen-modal{
  max-height: 400px;
}

.modal-content{
  background-color: rgb(29, 131, 131) !important;
  color: white;
  text-align: center;
  -webkit-box-shadow: 4px 4px 5px -6px  rgba(235,181,235,1);;
  -moz-box-shadow: 4px 4px 5px -6px rgba(255,255,255,1);
  box-shadow: 4px 4px 5px -6px rgba(255,255,255,1);
}
@media (min-width: 767px){
  .imagen-modal{
    max-height: 1000px;
  }
}
@media (min-width: 1025px){
  .info-modal{
    display: none;
  }
  .modal-content:hover{
    .info-modal{
      display: block;
      margin-top: -96px;
      background-color:rgba(0, 0, 0, 0.699);
    }
  }
  .modal-dialog {
    max-width: 600px !important;
  }
}

.img{
  -webkit-box-shadow: 4px 4px 5px -6px  rgba(235,181,235,1);;
  -moz-box-shadow: 4px 4px 5px -6px rgba(255,255,255,1);
  box-shadow: 4px 4px 5px -6px rgba(255,255,255,1);
}

.heading {
    text-align: center;
    font-size: 2.0em;
    letter-spacing: 1px;
    padding: 40px;
    color: white;
}

.gallery-image {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery-image img {
  height: 250px;
  width: auto;
  transform: scale(1.0);
  transition: transform 0.4s ease;
}

.img-box {
  box-sizing: content-box;
  margin: 10px;
  height: 250px;
  width: auto;
  overflow: hidden;
  display: inline-block;
  color: white;
  position: relative;
  background-color: black;
}

@media (max-width: 767px){
  .img-box{
    width: 100%;
    height: auto;
  }
  .gallery-image img {
     height: auto;
    width: 100%;
  }
}

.caption {
  position: absolute;
  bottom: 5px;
  left: 20px;
  opacity: 0.0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.transparent-box {
  height: 250px;
  width: 500px;
  background-color:rgba(0, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  transition: background-color 0.3s ease;
}

.img-box:hover img { 
  transform: scale(1.1);
}

.img-box:hover .transparent-box {
  background-color:rgba(0, 0, 0, 0.5);
}

.img-box:hover .caption {
  transform: translateY(-20px);
  opacity: 1.0;
}

.img-box:hover {
  cursor: pointer;
}

.caption > p:nth-child(2) {
  font-size: 0.8em;
}

.opacity-low {
  opacity: 0.5;
}


</style>



