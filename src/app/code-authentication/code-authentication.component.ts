import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { WindowService } from '../services/window.service';


export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`;
  }

}
@Component({
  selector: 'app-code-authentication',
  templateUrl: './code-authentication.component.html',
  styleUrls: ['./code-authentication.component.css']
})
export class CodeAuthenticationComponent implements OnInit {


  windowRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;

  user: any;
  constructor(private window: WindowService, private afAuth: AngularFireAuth) {
    auth().languageCode = 'ES';
   }
   
   
  ngOnInit() {
    this.windowRef = this.window.windowRef;
    this.windowRef.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();


//////////////////////////////////////////////////////
   
    auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
          console.log('Usuario logueado');

      } else {
          console.log('no logueado');
      }
  });

  auth().signInWithCustomToken
////////////////////////////////////

  }
  
  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;

    auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {
                this.windowRef.confirmationResult = result;
            })
            .catch( error => console.log(error));
          
          }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    this.user = result.user;

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


}