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
                <div class="row">  
                    <!-- subir imagen -->
                    <div class="col-6">
                        <UploadImage/>
                    </div>
                    <!-- categorias y etiquetas -->
                    <div class="col-6">
                        <!-- categorias -->
                        <CreateCategories/>
                        <!-- etiquetas -->  
                        <CreateLabels/>    
                    </div>
                </div>   
            </div>   
        </div>
    </div>
        
</template>

<script>
import NavbarAdmin from '../components/nav'
import Landing from '../components/landing'
import CreateLabels from '../components/create/create-labels'
import CreateCategories from '../components/create/create-categories'
import UploadImage from '../components/create/upload-image'


export default {
    components: {
        NavbarAdmin,
        Landing,
        CreateLabels,
        CreateCategories,
        UploadImage
    },
}
</script>


<style lang="scss" scoped>

form {
width: 25em;
padding: 1em;
border: 1px solid #ccc;
border-radius: .5em;
margin: 1em;
box-shadow: .25em .25em 0 #ccc;
}
 
.after-navbar{
    margin-top: 55px;
}

</style>

