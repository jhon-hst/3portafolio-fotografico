// importo a firebase asi por que en la consola retorna un warning que es mejor haver las importaciones individualmente
import firebase from "firebase/app";
// no entiendo pero tengo que importarlo asi no lo use aqui
// eslint-disable-next-line no-unused-vars
import firestore  from "firebase/firestore";

// eslint-disable-next-line no-unused-vars
import storage from "firebase/storage"

// eslint-disable-next-line no-unused-vars
import auth from 'firebase/auth'

import config from '../../config'
import Swal from 'sweetalert2'


firebase.initializeApp(config);

class Controller{
    constructor(){
        this.db = firebase.firestore() // abreviacion a la db
        this.element = [] //donde se gurdaran las imagenes por categoria
    }  
    
    //////////////////// PARA LA VISTA Y COMPONENTES DE CREATE
    
    // para agregar imagen
    async createImage (name, descriptionShort, descriptionLong, listCategories, listLabels, url, nameImage, urlBancoImages) {
        try {
            const refDoc = await this.db.collection('images').add({
                name: name,
                descriptionShort: descriptionShort,
                descriptionLong: descriptionLong,
                listCategories: listCategories,
                listLabels:listLabels,
                url, // como el mismo nombre del campo es el de valor nos es nesesario hacer un url:url arriba los deje así para ver los dos ejemplos
                nameImage,
                urlBancoImages,
                fecha: firebase.firestore.FieldValue.serverTimestamp() //esta es una forma de que fibase tomo la fecha del servidor
            });
            return refDoc.id;
        }
        catch (err) {
            console.log(`error al agregar información de la imagen en db ${err}`)
        }
    }
    // para subir la imagen, primero se optienen los metadatos como el name y la url, luego de optenerlo se realiza la función createImage donde se sube toda con los  metadatos de la imagen
    uploadImageController (file) {
        try{
            const refStorage = firebase.storage().ref(`images/${file.name}`)
            const task =  refStorage.put(file)
            return task
        }catch(err){
            console.log('error al subir imagen ' + err)
        }
      }

    // para traer categorias o etiquetas depende del parametro que llegue en collection
    async getCategoryAndLabel(collection){
        try{
            let data = []

            //asi puedo optener datos pero no en tiempo real
            // await this.db.collection(collection).get()
            // .then(querySnapshot =>

            // con onSnapshot optengo datos en tiempo real
            await this.db.collection(collection).
                onSnapshot(docSnapshot => {
                    data.length = 0 //para que borre los elemento que habian alli y luego vuelva a agragar los nuevo elementos
                    docSnapshot.forEach(doc => {
                        data.push(doc.data())
                    })
                })
            return data
        }
        catch (err){
            console.log(`error al optener categorías y etiquetas ${err}`)
        }
    }
    
    // para crear categorias o itiquetas, depende del parametro que llegue en collection 
    async createCategoryAndLabel(collection, name) {
        try {
            const create = await this.db.collection(collection).add({
                name: name,
                fecha: firebase.firestore.FieldValue.serverTimestamp()
            });
            // para agregarle el id del mismo documento
            this.db.collection(collection).doc(create.id).set(
                {
                  id: create.id //aqui esta el value
                },
                { merge: true } //este es el atributo para unir 
              )
            return create;
        }
        catch (err) {
            console.log(`error al crear nueva categoría o etiqueta ${err}`)
        }
    }
    // para actualizar categorias o etiquetas depende del parametro que llegue en collection
    async updateCategoryAndLabel(id, collection, value) {
        try {
            const update = this.db.collection(collection).doc(id)
            update.update({
              name: value
            })
            return update;
        }
        catch (err) {
            console.log(`error al modificar categoría o etiqueta ${err}`)
        }
    }

    // para eliminar categorias o etiquetas depende del parametro que llegue en collection
    async deleteCategoryAndLabel(id, collection) {
        try {
            const romeve = this.db.collection(collection).doc(id).delete()
            return romeve;
        }
        catch (err) {
            console.log(`error al eliminar categoría o etiqueta ${err}`)
        }
    }

    /////////////// PARA VER POR CATEGORIAS Y PODER ACTUALIZAR E ILIMINAR

    // para agregar los objetos en un array 
    getObjet(name, descriptionShort, descriptionLong, fecha, listCategories, listLabels, url, nameImage, urlBancoImages, id){
        this.element.push({
            name, 
            descriptionShort, 
            descriptionLong, 
            listCategories, 
            fecha,
            listLabels, 
            url,
            nameImage,
            urlBancoImages,
            id,
        })
    }

    // pedir las imagenes y sus datos dependiendo del parametro que llega
    async getByCategory(param){
        try{
            // 'listCategories', 'array-contains', 'queso' para hacer una consulta en un array, el primer parametro es el nombre del array el segundo no estoy muy seguro pero debe estar alli y el tercero es el value por el que se busca 
            this.db.collection('images')
            .where('listCategories', 'array-contains', param)
            .onSnapshot( docSnapshot => {
                this.element.length = 0 //cuando la db detecta algo un cambio esto se recarga entonces se duplica el array por eso hay que devolvrlo a 0
                docSnapshot.forEach(doc => {
                    this.getObjet(
                        doc.data().name,
                        doc.data().descriptionShort,
                        doc.data().descriptionLong,
                        doc.data().fecha,
                        doc.data().listCategories,  
                        doc.data().listLabels,
                        doc.data().url,
                        doc.data().nameImage,
                        doc.data().urlBancoImages,
                        doc.id
                    )                
                })  
            })
            // ojo que a esto this.element no le puedo hacer un console.log por que debido a la sincronia no va a servir se activara antes de que se llene de contenido hay que usar un setTimaut para ver bien esto
            return this.element
        }
        catch (err){
            console.log(`error al optener imagenes por categoría ${err}`)
        }
    }

    //eliminar imagen y sus datos
    deleteImage (name,id) {
        try{
            // elimana la imagen
            const refStorage = firebase.storage().ref(`images/${name}`)
            refStorage.delete()
                .then(function() {
                    // console.log('se elimino imagen')
                }).catch(function(error) {
                  console.log('error al eliminar la imagen' + error)
                  return false
                })
            // elimina los datos, en caso si viene id, esto es po que desde actualizacion si cambiamos de imagen no es necsario el eliminar los datos, si se le da a eliminar todo si
            if(id != null){
                this.db.collection('images').doc(id).delete()
            }
            return true

        }catch(err){
            console.log('no se puedo eliminar la imagen ' + err)
            return false
        }
    }

    // actualizamos imagen y sus campos, la url viene dinamica es por eso que llega aparte, se crea un nuevo campo llamado, dateUpdate para saber cuando se actualizo el contenido
    async updateImage(data, url) {
        try {
            const update = this.db.collection('images').doc(data.id)
            update.update({
                name: data.name,
                descriptionShort: data.descriptionShort,
                descriptionLong: data.descriptionLong,
                listCategories: data.categoriesSelect,
                listLabels: data.labelsSelect,
                nameImage: data.nameImage,
                urlBancoImages:  data.urlBancoImages,
                url: url,
                dateUpdate: firebase.firestore.FieldValue.serverTimestamp() //esta es una forma de que fibase tomo la fecha del servidor
            })
            return true;
        }
        catch (err) {
            console.log(`error al modificar la imagen ${err}`)
        }
    }

    //////////////  LEER Y ACTUALIZAR DATOS PERSONALES DESDE EL HOME CMS //////
    
    // mandamos a llamar los datos personales
    async getDataPerson(){
        try{
            let data = []
            await this.db.collection('dataPerson')
            .doc('a97mDTmV9ate2dgqulNi').
                onSnapshot(docSnapshot => {
                    data.length = 0 // esto nunca se debe olvidar cuando usamo real time debemos colocar todo en 0 para que se cargue con los nuevos datos
                    data.push(docSnapshot.data())
                })
            return data
        }
        catch (err){
            console.log(`error al optener los datos personales ${err}`)
        }
    }

    // para realizar la actualizacion de los datos personales
    async updateDataPerson(data) {
        try {
            const update = this.db.collection('dataPerson')
            .doc('a97mDTmV9ate2dgqulNi')
            
            update.update({
                banner: data.banner,
                descriptionPersonal: data.descriptionPersonal,
                descriptionProfessional: data.descriptionProfessional,
                facebook:  data.facebook,
                instagram: data.instagram,
                name:  data.name,
                photo:  data.photo,
                profession: data.profession,
                twitter:  data.twitter,
                youtube: data.youtube,
                whatsapp: data.whatsapp,
                dateUpdate: firebase.firestore.FieldValue.serverTimestamp() //esta es una forma de que fibase tomo la fecha del servidor
            })
            // console.log(update)
            return true;
        }
        catch (err) {
            console.log(`error al modificar los datos personales ${err}`)
            return false
        }
    }

    ///////  LOS TEXTO E IMAGENES QUE SE VERAN EN EL SITIO WEB
    // mandamos a llamar los datos que se veran en en e sitio web
    async getContentWeb(){
        try{
            let data = []
            await this.db.collection('textAndImagesWeb')
            .doc('Yi9PROjs1xCKvQhJYeTs').
                onSnapshot(docSnapshot => {
                    data.length = 0 // esto nunca se debe olvidar cuando usamo real time debemos colocar todo en 0 para que se cargue con los nuevos datos
                    data.push(docSnapshot.data())
                })
            return data
        }
        catch (err){
            console.log(`error al optener el contenido sel sitio web ${err}`)
        }
    }

       // para realizar la actualizacion de los datos que se veran en el sitio web
       async updateContentWeb(data) {
        try {
            const update = this.db.collection('textAndImagesWeb')
            .doc('Yi9PROjs1xCKvQhJYeTs')
            
            update.update({
                firstText: data.firstText,
                secondText: data.secondText,
                thirdText: data.thirdText,
                firstImage: data.firstImage,
                firstTextAbout: data.firstTextAbout,
                secondTextAbout: data.secondTextAbout,
                thirdTextAbout: data.thirdTextAbout,
                firstImageAbout: data.firstImageAbout,
                dateUpdate: firebase.firestore.FieldValue.serverTimestamp() //esta es una forma de que fibase tomo la fecha del servidor
            })
            // console.log(update)
            return true;
        }
        catch (err) {
            console.log(`error al modificar los datos del contenido web ${err}`)
            return false
        }
    }
    /////// LOGIN AND REGISTER
    crearCuentaEmailPass (email, password, nombres) {        
        firebase.auth().createUserWithEmailAndPassword(email, password) //regresa una promesa
          .then(result =>  {
            result.user.updateProfile({//para el nombre
              displayName: nombres
            })
            const configuracion = {//este es el link para que al usurio autenticarse salga un boton de continuar y lo envie a la pagina
              url: 'http://localhost:8080/'
            }
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Ya casi esta! ahora solo debes verificar tu correo',
                showConfirmButton: false,
                timer: 1500
            })
            //para verificar que exista ese usuario que si tenga correo, esto le envia un correo de auteticación
            result.user.sendEmailVerification(configuracion).catch(error => {
              console.error(error)
            })
    
            firebase.auth().signOut() //para decirle que no guarde al usuario este le di clic en el link de verificación
            
            // console.log('hola '+nombres)
          })
          .catch(error => {
            console.error(error)
          })   
      }

     autEmailPass (email, password) {
        const data =firebase.auth().signInWithEmailAndPassword(email, password) //para la verificacioón de usurario
        
        return data

        .catch(error => {//en caso de error
            Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Correo o contraseña invalido',
                showConfirmButton: false,
                timer: 1500
            })
            console.log('error al autenticarse con google' + error) 
        })
     }

    // despues hago esto del login con firebase
    authCuentaGoogle () {//para registrarme cono una cuenta de google
        const providor = new firebase.auth.GoogleAuthProvider() //se instance de la clase para hacer la autentificación
    
        const data = firebase.auth().signInWithPopup(providor) //para crear el popup para la atentificación con google
        return data
        //   .then( result => {
        //     console.log(result.user.photoURL) //aqui devuelve la foto que tiene en la cuenta de google
        //     console.log(result.user.displayName) //tambien es el de su cuenta de google
        //     const data = {
        //         image: result.user.photoURL,
        //         name: result.user.displayName
        //     }
        //    return data
        //   })
        //   .catch(error => {//en caso de error
        //     console.log('error al autenticarse con google' + error) 
        //     return false
        //   })
      }

      
}

export default Controller