import { Injectable } from '@angular/core';
import {auth} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConexionService } from './conexion.service';

export class PhoneNumber {
  country: string;
  number: string;
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.number
    return `+${num}`
  }

}
@Injectable({
  providedIn: 'root'
})
export class CodeAuthenticationService {
  
  windowRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;
  user: any;
  constructor(public afth: AngularFireAuth,private conexion: ConexionService) { 
    auth().languageCode ='ES';
  }

  sendLoginCOde(){
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;

    auth().signInWithPhoneNumber(num, appVerifier)
    .then(result => {
      this.windowRef.confirmationResult = result;
       //.windowRef.confirmationResult se pone ngIf en el
       // componente que consume este servicio
    })
    .catch(error => console.log(error));
  }

   verifyLoginCode(user) {
     var Uid;
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    this.user = true;
                    console.log('verificado exitosamente')
                    console.log();
                    
                    
    }).then(()=>{
      user.uID = auth().currentUser.uid;
      this.conexion.agregarUsuario(user);
    })
    .catch( error => console.log(error, "Incorrect code entered?")); 
   
  }

  signOut(){
    auth().signOut().then(function() {
      console.log('Sign-out successful.') 
    }).catch(function(error) {
      // An error happened.
    });
  }
  getUId(){
    return this.afth.auth.currentUser.uid


  }
}