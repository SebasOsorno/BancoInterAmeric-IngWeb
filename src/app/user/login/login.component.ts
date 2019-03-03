import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: string = '';
  public password: string = '';
  public userExist: boolean = false;
  constructor(public afAuth: AngularFireAuth, private Conexion: ConexionService) {

  }

  ngOnInit() {
    this.usuario = '';
    this.password = '';
    this.userExist=false;
  }
  onLogOut() {
    this.afAuth.auth.signOut();
  }
  usuarios: any;

  validarUsuario() {

    var b = false;

    this.Conexion.listaUsuario().subscribe(usuario2 => {

      this.usuarios = usuario2;

      this.usuarios.forEach(userf => {
        if (userf.usuario == this.usuario && userf.pass == this.password) {
          this.userExist = true;
          console.log('usuario exite. digite el codigo de verificación')
        }
      });

      if (this.userExist) {
        alert("Inició sesión");
      }
      else {
        alert("Usuario y/o contraseña incorrecta");
      }



    })



  }
}