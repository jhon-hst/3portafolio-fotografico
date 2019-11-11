<template>
    <div class="container-fluid">
        
        <div class="row">
            <div class="col-12">
                <Navbar-admin/>
            </div>
            <div class="col-2 after-navbar">
                <Landing/>
            </div>
            <div class="col-10 after-navbar">
                <DataPerson/>
                <Auth/>
            </div>   
        </div>
    </div>
</template>

<script>
import NavbarAdmin from '../components/nav'
import Landing from '../components/landing'
import DataPerson from '../components/home/data-person'
import Auth from '../components/home/auth/authComponent'

import {mapState, mapActions, mapGetters} from 'vuex'
export default {
    name: 'home-admin',
    data () {
        return {
            // test: 'hooooolaaa',
            // nada: null //ejemplo de como trabajar una accion computada
        }
    },
    components: {
        NavbarAdmin,
        Landing,
        DataPerson,
        Auth
    }, 
    // dependiendo del estado que llegue se mostrara la vista
    computed: { 
        // stringTest() { // nada: null //ejemplo de como trabajar una accion computada
        //     return this.hola()
        // },
        ...mapState(['stateAdminView']),
    },
    // methods:{ // nada: null //ejemplo de como trabajar una accion computada
    //     hola(){
    //         console.log('hola soy el metedo')
    //     }
    // }, 
    // mounted(){
    //     this.hola()
    // }
}
</script>

<style lang="scss" scoped>
    .after-navbar{
        margin-top: 55px;
    }
</style>

