<template>
    <div>
        <button class="btn btn-primary" id="show-modal" @click="showModal = true">Modificar</button>
        <button type="button" class="btn btn-danger" @click="alertDelete">
            eliminar
        </button>
        <!-- modal para la edición de la imagen -->
        <Modalupdate v-if="showModal" @close="showModal = false" v-bind:data="data"/>
    </div>
</template>
<script>

import Controller from '../../../firebase/db/controller'
import Swal from 'sweetalert2'
import Modalupdate from './modalupdate'

const instance = new Controller

export default {
    data(){
        return{
            showModal: false
        }
    },
    components:{
        Modalupdate
    },
    props:{ 
        data: Object,
    },
    methods: {
        // alerta para eliminar imagen
        alertDelete(event) {
            // optengo el dato
            let nameImage = event.path[2].children[0].innerHTML
            // const nameImage = this.$refs.title.value //sirve para optener una referencia pero dinamicamnete no se ve moy bien
            Swal.fire({
            title: nameImage,
            text: '¿Esta seguro que desea eliminar esta imagen?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ¡eliminar imagen!'
            }).then((result) => {
                if(result.value === true){
                    this.deleteFromController()
                }
            })
        },
        // eliminar imagen y sus datos
        deleteFromController(){
            const name = this.data.nameImage
            const id = this.data.id
            const eliminar = instance.deleteImage(name,id)
            if (eliminar === true) { // si salio bien
                Swal.fire(
                'Eliminada!',
                'Se elimino con exito la imagen',
                'success'
                )
            }else{ //si salio mal
                Swal.fire(
                'Deleted!',
                'Error al eliminar la imagen recargue la página e intente de nuevo',
                'error'
                )
            }
        },

        // mediante el evento optengo los hermanos del boton para usar el contenido de estos, debi ver usado v-model para un mejor codificación, pero no se por que no funcionaba, solo con este modal, con el resto de cosas si sirve bien, aquí es como si el modal apareciera antes de que esta funcion trasnformara los datos para ver el en el form
        
    },
    
}
</script>