import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private Conexion:ConexionService) { }
  public usuario: string ='';
  public password: string ='';
  ngOnInit() {
  }
  onLogOut(){
    this.afAuth.auth.signOut();
  }
  usuarios:any;

  validarUsuario(user,pass){
    user=this.usuario;
    pass=this.password;
    var b= false;
    this.Conexion.listaUsuario().subscribe(usuario2 => {
    this.usuarios= usuario2;
    this.usuarios.forEach(userf => {
      if(userf.usuario==user && userf.pass==pass){
        b = true;              
      }
    });
    if(b){
      alert("Inició sesión");
    }
    else{
      alert("Usuario y/o contraseña incorrecta");
    }
  })  
  }
}