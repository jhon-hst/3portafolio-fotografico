<template>
  <div 
    class="home-about" 
    v-if="data[0]" 
    :style="{'background-image': `url('${data[0].firstImageAbout}')`}"
    >
    <div class="loading" :style="{display: displayLoading}">
        <Loading/>
    </div>
    <div class="menu" :style="{display: displayAbout}">
        <Menu/>
    </div>
    <div v-if="data[0]" :style="{display: displayAbout}">
      <div class="container-fluid ">
          <div class="row justify-content-center fondo">
            <div class="col-12 col-md-4 info">
              <h1 class="title-about ">{{data[0].firstTextAbout}}</h1>
              <p>
                {{data[0].secondTextAbout}}
              </p>
              <p>
                {{data[0].thirdTextAbout}}
              </p>
              <Social/>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>
<script>
import Controller from '../firebase/db/controller'
import Menu from '@/components/menu'
import Loading from '@/components/loading'
import Social from '../components/social'

const instance = new Controller

export default {
  data(){
    return{
        displayLoading: 'block',
        displayAbout: 'none',
        data: []
    }
  },
  components:{
    Menu,
    Loading,
    Social
  },
  async mounted(){
    // para la animacion de la carga antes se que salga todo
    setTimeout(() => {
        this.displayLoading = 'none'
        this.displayAbout = 'block'
    },1000)
    this.data = await instance.getContentWeb()
    // console.log(this.data)
  },

}
</script>

<style lang="scss" scoped>
.home-about{
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  color: white;
  font-family: 'Viga', sans-serif;
  background-color: rgb(0, 0, 0) !important;
}
.info{
  margin-top: 100px; 
  box-shadow: 0 0 10px rgba(7,7,7,.7);
  background: rgba(0, 0, 0,0.8);
}
@media (max-width: 767px){
  .fondo{
    margin-right: 0px !important;
    margin-left: 0px !important;
  }
}
// .title-about{
  
//   //  align-items: center;
// }



</style>

