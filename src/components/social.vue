<template>
<!-- v-if="data[0]" para que renderize el contenido si llego la data -->
    <ul class="list-redes" v-if="data[0]">
        <li class="red-social">
          <a :href="data[0].facebook" target="_blank">
            <i class="icon fab fa-facebook-square icon-facebook"></i>
          </a>
        </li>
        <li class="red-social">
          <a :href="data[0].whatsapp" target="_blank">
            <i class="icon fab fa-whatsapp-square icon-whatsapp"></i>
          </a>
        </li>
        <li class="red-social">
          <a :href="data[0].youtube" target="_blank">
            <i class="icon fab fa-youtube icon-youtube"></i>
          </a>
        </li>
        <li class="red-social">
          <a :href="data[0].twitter" target="_blank">
            <i class="icon fab fa-twitter-square icon-twitter"></i>
          </a>
        </li>
        <li class="red-social">
          <a :href="data[0].instagram" target="_blank">
            <i class="icon fab fa-instagram icon-instagram"></i>
          </a>
        </li>
        <li>
         
        </li>
    </ul>
</template>
<script>

import Controller from '../firebase/db/controller'
const instance = new Controller

export default {
  data(){
    return{
      data: []
    }
  },
  async mounted(){ 
    const get = await instance.getDataPerson()
    this.data = get
    // console.log(this.data[0])
  }
}
</script>


<style lang="scss" scoped>
.list-redes{
  list-style: none;
  padding: 0 !important;
}

.red-social{
   display:inline;
   padding: 5px;
}
.icon{
  font-size: 3em;
  color: rgb(29, 131, 131);
  border-radius: 30%;
  cursor: pointer;
}
.icon-facebook:hover{
  color: #4267B2;
  background-color: white;
}
.icon-whatsapp:hover{
  color: #5AE778;
  background-color: white;
}
.icon-youtube:hover{
  color: #FA423B;
  background-color: white;
}
.icon-twitter:hover{
  color: #4AB3F4;
  background-color: white;
}
.icon-instagram:hover{
  color: #232020;
  background-color: white;
}
</style>

