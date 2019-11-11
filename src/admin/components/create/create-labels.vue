<template>
     <form class="theform" role="form">
        <div class="form-group">
            <!-- uso un slot ya que upload-image uso este component, alla explico como lo uso -->
            <slot name="listlabels">
                <div v-show="createEtiquetaBoton">
                    <label >Crear etiqueta</label>
                    <button class="btn btn-danger" @click.prevent="submit"> Crear</button>
                </div>
                <div v-show="deleteUpdateEtiqueta">
                    <label  >Modificar o eliminar</label>
                    <button class="btn btn-danger"  @click.prevent="update"> Modificar</button>
                    <button class="btn btn-danger" @click.prevent="romeve"> Eliminar</button>
                    <button class="btn btn-danger" @click.prevent="changeToCreateEtiqueta"> Crear</button>
                </div>
                <input v-model="createEtiqueta" type="text" class="form-control"/>
                <label for="apellidos">Modificar o eliminar etiqueta</label>
            </slot>
                <select v-model="updateDeleteEtiqueta" id="selectLabel" class="form-control"> 
                    <option value="default">Seleccione Una etiqueta</option>
                    <option v-for="(reason, key) in dataLabel" 
                            :value="reason.id"
                            :key="key">
                        {{reason.name}}
                    </option>
                </select>
        </div>
    </form>
</template>
<script>
import controller from '../../../firebase/db/controller'
import getData from './mixin'
import Swal from 'sweetalert2'

const instance = new controller


export default {
    data() {
        return {
            createEtiquetaBoton: true,
            deleteUpdateEtiqueta: false,
            updateDeleteEtiqueta: "default",
            createEtiqueta: '',
            dataLabel: null
        }
    },
    watch: {
        // para cuando se selecione alguna etiqueta para modificar o eliminar
        updateDeleteEtiqueta(v,n) {
            this.selectedEtiqueta(this.updateDeleteEtiqueta)
        }
    },
    methods: {
        // cambia las opciones de crear a modificar y eliminar etiquetas
        selectedEtiqueta() {
            if(this.updateDeleteEtiqueta != 'default'){
                this.createEtiquetaBoton = false
                this.deleteUpdateEtiqueta = true

                // para optener el texto del select
                const selectLabel = document.getElementById("selectLabel")
                let textLabel = selectLabel.options[selectLabel.selectedIndex].text

                this.createEtiqueta = textLabel
            }else {
                this.createEtiquetaBoton = true
                this.deleteUpdateEtiqueta = false
                this.createEtiqueta = ''
            } 
        },
        // para volver al estado de crear Etiqueta
        changeToCreateEtiqueta() {
            this.updateDeleteEtiqueta = 'default'
        },
        // guardar la etiqueta en la db
        async submit() {
            // nos aeguramos que el campo este lleno
            if(this.createEtiqueta == ''){
                this.messageError('Se le debe colocar algún nombre a la etiqueta')
                return
            }
            const data = await instance.createCategoryAndLabel(
                'labels',
                this.createEtiqueta,
            )
            this.messageSuccess('Se agrego etiqueta con éxito')

            // console.log('creado' + data)
        },
        // actualizar etiqueta
        async update() {
            // nos aeguramos que el campo este lleno
            if(this.createEtiqueta == ''){
                this.messageError('Se le debe colocar algún nombre a la etiqueta')
                return
            }
            const data = await instance.updateCategoryAndLabel(
                this.updateDeleteEtiqueta,
                'labels',
                this.createEtiqueta,
            )
            this.messageSuccess('Se modifico etiqueta con éxito')
            // console.log('actualizado' + data)
        },
        // eliminar etiqueta
        async romeve() {
            const data = await instance.deleteCategoryAndLabel(
                this.updateDeleteEtiqueta,
                'labels'
            )
            this.messageSuccess('Se eliminio etiqueta con éxito')
            // console.log('removido' + data)
        },
        messageSuccess(data){
            Swal.fire({
                position: 'center',
                type: 'success',
                title: data,
                showConfirmButton: false,
                timer: 1500
            })
            this.createEtiqueta = ''
        },
        messageError(data){
            Swal.fire({
                position: 'center',
                type: 'error',
                title: data,
                showConfirmButton: false,
                timer: 1500
            })
        }

        // eventBus(){ // para practicar con el bus de eventos, en la carpeta de plugin y en main.js se hacen una configuraciones
        //     this.$bus.$emit('listCategories', 'hola')
        // }
    },

    // para listar las etiquetas, uso un mixin ya que uso este codigo en dos componentes a la ves
    mixins: [getData],
   
   // ahora uso mixin para hacer esto mismo
    // async mounted() {
    //     this.data = await instance.getCategoryAndLabel('labels')
    //     // this.eventBus() //para practicar con el bus de eventos, en la carpeta de plugin y en main.js se hacen una configuracioness
    // }
}
</script>


