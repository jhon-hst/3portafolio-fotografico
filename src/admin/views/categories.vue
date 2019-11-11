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
                <WatchAll v-bind:param="id"/>
            </div>   
        </div>
    </div>
</template>
<script>
import NavbarAdmin from '../components/nav'
import Landing from '../components/landing'
import WatchAll from '../components/cotegories/watch-all'

export default {
    data (){
        return {
            id: null
        }
    },
    components:{
        NavbarAdmin,
        Landing,
        WatchAll
    },
    created: function(){
        this.recuperarPost();
    }, 
    methods: {
        recuperarPost() {
            this.id = this.$route.params.id;
        }
    }
}
</script>

<style lang="scss" scoped>
    .after-navbar{
        margin-top: 55px;
    }
</style>
