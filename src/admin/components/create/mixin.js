import controller from '../../../firebase/db/controller'
const instance = new controller

const getData = {
    async mounted() {
        this.dataLabel = await instance.getCategoryAndLabel('labels')
        this.dataCategory = await instance.getCategoryAndLabel('categories')
    },
    watch:{
        // para cuando se detecte una seleccion se activen estas funciones
        selectCategory(){
            if(this.selectCategory != 'default'){
                this.selectCategoryPush()
            }
        },
        selectLabel(){
            if(this.selectLabel != 'default'){
                this.selectLabelPush()
            }
        },
    },
    methods: {
        // para agregar en el array las categorias seleccionadas
        selectCategoryPush(){
            // si ya existe no se volvera a agregar
            for (let i = 0; i < this.categoriesSelect.length; i++){
                if(this.categoriesSelect[i] == this.selectCategory){
                    console.log('existe')
                    this.selectCategory = 'default'
                    return
                }
            }
            this.categoriesSelect.push(this.selectCategory)
            this.showSelectCategories = true
            this.selectCategory = 'default'
        },
        // para agregar en el array las etiquetas seleccionadas
        selectLabelPush(){
            // si ya existe no se volvera a agregar
            for (let i = 0; i < this.labelsSelect.length; i++){
                if(this.labelsSelect[i] == this.selectLabel){
                    console.log('existe')
                    this.selectLabel = 'default'
                    return
                }
            }
            this.labelsSelect.push(this.selectLabel)
            this.showSelectLabels = true
            this.selectLabel = 'default'
        },
        // para borrar categorias seleccionadas
        removeCategory(data) {
            for (let i = 0; i < this.categoriesSelect.length; i++){
                if(this.categoriesSelect[i] == data){
                    this.categoriesSelect.splice( i , 1 )
                }  
            }
        },
        // para borrar etiquetas seleccionadas
        removeLabel(data) {
            for (let i = 0; i < this.labelsSelect.length; i++){
                if(this.labelsSelect[i] == data){
                    this.labelsSelect.splice( i , 1 )
                }  
            }
        }
    },
}

export default getData