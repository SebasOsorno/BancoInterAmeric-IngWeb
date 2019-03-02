import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { WindowService } from '../services/window.service';
import {auth} from 'firebase/app';
import { CodeAuthenticationService } from '../services/code-authentication.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  usuarios: any;

  user: any = {
    nombre: '',
    usuario: '',
    pass: '',
    cel: '',
    cedula: '',
    dateCedula: '',
    residencia: '',
    direccion: '',
    paisMoneda:'',
    uID:''
  }

  verificationCode: string;
  constructor(private window:WindowService,private conexion: ConexionService,private phoneCode:CodeAuthenticationService) { 
    this.conexion.listaUsuario().subscribe(usuario => {
      this.usuarios = usuario;
      console.log(this.usuarios);
    })
  }

  ngOnInit() {
    this.phoneCode.windowRef= this.window.windowRef;
    this.phoneCode.windowRef.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container')
    this.phoneCode.windowRef.recaptchaVerifier.render()
  }
  agregarUsuario(){    
    this.phoneCode.phoneNumber.country='57';
    this.phoneCode.phoneNumber.number = this.user.cel;
    this.phoneCode.sendLoginCOde();
   
  }

  verifyLoginCode(){

    this.phoneCode.verificationCode =this.verificationCode;
    this.phoneCode.verifyLoginCode(this.user)
    
    this.user.nombre = '';
    this.user.usuario = '';
    this.user.pass = '';
    this.user.cel = '';
    this.user.cedula = '';
    this.user.dateCedula = '';
    this.user.residencia = '';
    this.user.direccion = '';
    this.user.uID='';
  
    
    

  }
  signOut(){
    this.phoneCode.signOut();
  }
 

}
