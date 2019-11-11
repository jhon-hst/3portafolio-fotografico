<template>
<div class="target row">
    <div class="card col-3" v-for="(reason, key) in list" :key="key">
        <img class="card-img-top" :src="reason.url" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title" >{{reason.name}}</h5>
            <p class="card-text">{{reason.descriptionShort}}</p>
            <!-- para despues -->
            <!-- <p>lugar: <span>4</span></p> -->
            <Botones v-bind:data="reason"/>
        </div>
    </div>
</div>
</template>

<script>
import Controller from '../../../firebase/db/controller'
import Botones from './delete-update'

// el contralador no me sirvio, de momento no fui capas de traer los datos desde el controlador por un problema con la sincronia
const instance = new Controller

export default {
    data(){
        return{
            list: [],
        }
    },
    props:{  
        param: String,
    },
    components: {
        Botones
    },
    async mounted(){
        // pedir las imagenes y sus datos dependiendo del parametro que llega
        this.list = await instance.getByCategory(this.param)
        // este console.log no funciona ya que por la sincronia el no serviria, perdi muchi tiempo penasndo que este iba a servir y resulta que por la sincronia no funciona, si quiero ver uno bien hay que usar el watch
        // console.log(this.list)

    },
    watch:{
        // para poder ver la verdadera lista cuando llegue
        // list(){
        //     console.log(this.list)
        // }
    }

}
</script>

