<template>
    <form class="theform" role="form">
        <div class="form-group">
            <div v-show="create">
                <label>Crear Categoría</label>
                <button class="btn btn-danger" @click.prevent="submit"> Crear</button>
            </div>
            <div v-show="deleteUpdate">
                <label>Modificar o eliminar</label>
                <button class="btn btn-danger" @click.prevent="update"> Modificar</button>
                <button class="btn btn-danger" @click.prevent="romeve"> Eliminar</button>
                <button class="btn btn-danger" @click.prevent="changeToCreate"> Crear</button>
            </div>
            <input v-model="createCategory" type="text" class="form-control"/>
            <label >Modificar o eliminar categoría</label>
            <select v-model="updateDeleteCategory" id="select" class="form-control">
                <option value="default">Seleccione Una categoría</option>
                <!-- como es array el que se esta recorriendo hay que crear alias para llave y el valor -->
                <option v-for="(reason, key) in dataCategory" 
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
            create: true,
            deleteUpdate: false,
            updateDeleteCategory: "default", // a lo hora de modificar o eliminar aquí se gurdara el id
            createCategory: '',
            dataCategory: null
        }
    },
    watch: {
        // para cuando se selecione alguna categoria para modificar o eliminar
        updateDeleteCategory(v,n) {
            this.selectedCategory(this.updateDeleteCategory)
        },
    },
    methods: {
        // cambia las opciones de crear a modificar y eliminar las categorias
        selectedCategory() {
            if(this.updateDeleteCategory != 'default'){
                this.create = false
                this.deleteUpdate = true
                
                // para optener el texto del select
                let select = document.getElementById("select")
                let text = select.options[select.selectedIndex].text

                this.createCategory = text
            }else {
                this.create = true
                this.deleteUpdate = false
                this.createCategory = ''
            } 
        },
        // para volver al estado de crear categoría
        changeToCreate() {
            this.updateDeleteCategory = 'default'
        },
        // guardar categoria en la db
        async submit() {
            // nos aeguramos que el campo este lleno
            if(this.createCategory == ''){
                this.messageError('Se le debe colocar algún nombre a la categoría')
                return
            }
            const data = await instance.createCategoryAndLabel(
                'categories',
                this.createCategory,
            )
            this.messageSuccess('Se agrego categoría con éxito')
            // console.log(data)
        },
        // actualizar categoria
        async update() {
            // nos aeguramos que el campo este lleno
            if(this.createCategory == ''){
                this.messageError('Se le debe colocar algún nombre a la categoría')
                return
            }
            const data = await instance.updateCategoryAndLabel(
                this.updateDeleteCategory,
                'categories',
                this.createCategory,
            )
            this.messageSuccess('Se modifico categoría con éxito')
        },
        // eliminar categoria
        async romeve() {
            const data = await instance.deleteCategoryAndLabel(
                this.updateDeleteCategory,
                'categories'
            )
            this.messageSuccess('Se elimino categoría con éxito')
        },
        messageSuccess(data){
            Swal.fire({
                position: 'center',
                type: 'success',
                title: data,
                showConfirmButton: false,
                timer: 1500
            })
            this.createCategory = ''
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

    },
    // para listar las categorias, 
    mixins: [getData],
    
    // el mixin hace essto mismo    
    // async mounted() {
    //     this.data = await instance.getCategoryAndLabel('categories')
    // }
}
</script>

