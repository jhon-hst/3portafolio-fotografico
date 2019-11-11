<template>
<div class="target row">
    <div class="card col-3" v-for="(reason, key) in dataCategory"  :key="key">
        <!-- esta es la unica forma que vi de mandar un parametro por url -->
        <router-link :to="{name: 'admin-categories', params: { id:reason.name }}">   
            <!-- <img class="card-img-top" srsc="../../../assets/logo.png" alt="Card image cap"> -->
            <div class="card-body">
                <h5 class="card-title" >{{reason.name}}</h5>
            </div>
        </router-link>
    </div>
</div>
</template>

<script>

// me traigo este mixin por que ya tiene la logica para las categorias
import getData from '../create/mixin'

export default {
    data(){
        return {
            // dataCategory se llena desde el mexin
            dataCategory: [],
            msg: 'soylink'
        }
    },
    components: {

    },
    mixins: [getData]
}
</script>

