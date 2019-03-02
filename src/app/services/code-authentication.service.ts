import { Injectable } from '@angular/core';
import { WindowService } from '../services/window.service';
import {auth} from 'firebase/app';

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
  constructor() { 
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

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    this.user = true;
                    console.log('verificado exitosamente')
                    console.log(auth().currentUser.uid)

    })
    .catch( error => console.log(error, "Incorrect code entered?")); 
  }

  signOut(){
    auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  getUId(){
    return auth().currentUser.uid;
  }
}
