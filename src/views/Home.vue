<template>
<div>
      <div :style="{display: displayLoading}">
        <Loading/>
      </div>
      <div :style="{display: displayHome}">
        <Menu/>
      </div>
  <div 
    v-if="data[0]" 
    class="home" 
    :style="{display: displayHome, 'background-image': `url('${data[0].firstImage}')`}"
  >
    <div >
      <div class="container-fluid ">
          <div class="row justify-content-center ">
            <div class="col-12 col-md-6 info">
              <h1 class="title-home">{{data[0].firstText}}</h1>
              <p class="text-one-home">
                {{data[0].secondText}}
              </p>
              <p class="text-two-home"> 
                {{data[0].thirdText}}
              </p>
              <Social/>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/menu.vue'
import Loading from '@/components/loading'
import Social from '../components/social'

import Controller from '../firebase/db/controller'
const instance = new Controller

export default {
    data(){
      return{
        displayLoading: 'block',
        displayHome: 'none',
        data: []
      }
    },
  
  name: 'home',
  components: {
    Menu,
    Loading,
    Social
  },
  async mounted(){
    setTimeout(() => {
        this.displayLoading = 'none'
        this.displayHome = 'block'
    },1000)
    this.data = await instance.getContentWeb()
  }
}
</script>

<style lang="scss" scoped>

  .home{
    background-repeat: no-Repeat; 
    background-size: cover; 
    height: 100vh;
    color: white;
    font-family: 'Viga', sans-serif;
    background-color: rgb(0, 0, 0) !important;
  }
  .info{
    margin-top: 170px; 
    text-align: center;
  }
  .title-home{
    font-size: 4em;
  }
  .text-one-home{
    font-size: 2.5em;
  }
  .text-two-home{
    font-size: 1.7em;
  }

@media (max-width: 767px ){
    .title-home{
    font-size: 3em;
  }
  .text-one-home{
    font-size: 1.7em;
  }
  .text-two-home{
    font-size: 1em;
  }
}

</style>

