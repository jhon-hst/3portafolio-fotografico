<template>
    <div>
        <i @click="toggle" class="boton fas fa-bars"></i> 
        <router-link :to="{ name: 'about'}">
            <span class="sobre-mi">Sobre mí</span>
        </router-link>
        <div id="wrapper" v-bind:class="{ active: isActive, '' : 'active' }">
            <div id="sidebar-wrapper">
                <ul class="sidebar-nav" id="sidebar">  
                    <router-link 
                        :to="{ name: 'home'}"> 
                        <li class="list"> home </li>   
                    </router-link>
                    <router-link  v-for="(reason, key) in dataCategory"  :key="key" :to="{ name: 'category', params: { id:reason.name }}">
                        <li class="list" @click="toggle" > {{reason.name}} </li>
                    </router-link>
                    <router-link 
                        :to="{ name: 'about'}"> 
                        <li class="list sobre-mi-list"> Sobre mí </li>   
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import getData from '../admin/components/create/mixin'

export default {
    data () {
        return {
            // dataCategory se llena desde el mexin
            dataCategory: [],
            isActive: false
        }
    },
    methods: {
      // para el movimiento o animación del menú lateral
      toggle () {
          this.isActive = !this.isActive
      },
    },
    mixins: [getData]
}
</script>

<style lang="scss" scoped>
.boton{
    color: rgb(29, 131, 131);
    position: fixed;
    top: 40px;
    left: 70px;
    z-index: 2;
    font-size: 30px;
    cursor: pointer;
}
.boton:hover{
    color: white;
}

.sobre-mi{
    display: none;
    color: white;
    position: absolute;
    top: 40px;
    right: 70px;
    z-index: 2;
    font-size: 1.7em;
    font-family: 'Viga', sans-serif;
    -webkit-box-shadow: 4px 4px 5px -6px  rgba(235,181,235,1);;
    -moz-box-shadow: 4px 4px 5px -6px rgba(255,255,255,1);
    box-shadow: 4px 4px 5px -6px rgba(255,255,255,1);
    text-transform: uppercase;
}
.sobre-mi:hover{
    color: rgb(29, 131, 131);
}
@media (min-width: 767px){
    .boton{
        left: 150px;
    }   
    .sobre-mi{
        display: block;
    }
    .sobre-mi-list{
        display: none;
    }
}
.row{
    margin-left:0px;
    margin-right:0px;
}

.list{
    list-style:none; 
    padding: 30px 0px 30px 0px;
    margin: 10px;
    background: rgb(29, 131, 131);
    text-decoration: none;
    text-align: center;
    border-radius: 0% 5% 5% 0%;
    // height: 100px;
    position: relative;
    top: 70px;
    color: white;
    text-decoration: none;
    font-size: 1.2em;
    text-transform: uppercase;
    font-family: 'Viga', sans-serif;
    -webkit-box-shadow: 4px 4px 5px -6px  rgba(235,181,235,1);;
    -moz-box-shadow: 4px 4px 5px -6px rgba(255,255,255,1);
    box-shadow: 4px 4px 5px -6px rgba(255,255,255,1);
    // width: 180px
}
.list:hover{
   color: black; 
}

a:hover{
    
    text-decoration: none;
}

// #wrapper {
//     padding-left: 0px;
//     transition: all .4s ease 0s;
//     height: 100%
    
// }

#sidebar-wrapper {
    margin-left: -300px;
    left: 0px;
    width: 300px;
    background: transparent;
    position: fixed;
    height: 100%;
    z-index: 1;
    transition: all .4s ease 0s;
    overflow-y: scroll;
}

#sidebar-wrapper::-webkit-scrollbar {
  width: 2px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
}
/* Add a thumb */
// #sidebar-wrapper::-webkit-scrollbar-thumb {
//     background: rgba(250, 250, 250, 0.5);
// }

#page-content-wrapper {
    padding-left: 0;
    margin-left: 0;
    width: 100%;
    height: auto;
}
#wrapper.active {
    padding-left: 150px;
}
#wrapper.active #sidebar-wrapper {
    left: 250px;
}



</style>
