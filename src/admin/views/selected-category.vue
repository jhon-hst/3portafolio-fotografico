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
                <SelectedCategory/>
            </div>   
        </div>
    </div>
</template>
<script>
import NavbarAdmin from '../components/nav'
import Landing from '../components/landing'
import SelectedCategory from '../components/selected-category/selected'

export default {
    components:{
        NavbarAdmin,
        Landing,
        SelectedCategory
    }
}
</script>

<style lang="scss" scoped>
    .after-navbar{
        margin-top: 55px;
    }
</style>
