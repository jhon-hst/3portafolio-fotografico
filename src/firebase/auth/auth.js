// importo a firebase asi por que en la consola retorna un warning que es mejor haver las importaciones individualmente
import firebaseApp from "firebase/app";
// no entiendo pero tengo que importarlo asi no lo use aqui

// eslint-disable-next-line no-unused-vars
import auth from 'firebase/auth'

// import config from '../../config'
// firebaseApp.initializeApp(config);


class authentication {
    authCuentaGoogle () {//para registrarme cono una cuenta de google
        const providor = new firebaseApp.auth.GoogleAuthProvider() //se instance de la clase para hacer la autentificación
    
        firebaseApp.auth().signInWithPopup(providor) //para crear el popup para la atentificación con google
          .then( result => {
            console.log(result.user.photoURL) //aqui devuelve la foto que tiene en la cuenta de google

           console.log(result.user.displayName) //tambien es el de su cuenta de google
          })
          .catch(error => {//en caso de error
            console.log('error al autenticarse con google' + error) 
          })
      }
}
export default authentication