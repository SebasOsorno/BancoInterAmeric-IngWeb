import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ConexionService } from 'src/app/services/conexion.service';
import { CodeAuthenticationService } from 'src/app/services/code-authentication.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: string = '';
  public password: string = '';
  public userExist: boolean = false;
  public verificationCode: string;
  constructor(private window: WindowService, public afAuth: AngularFireAuth, private Conexion: ConexionService, private phoneCode: CodeAuthenticationService) {

  }

  ngOnInit() {
    this.usuario = '';
    this.password = '';
    this.userExist = false;
    this.phoneCode.windowRef = this.window.windowRef;
    this.phoneCode.windowRef.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container')
    this.phoneCode.windowRef.recaptchaVerifier.render()
  }
  onLogOut() {
    this.afAuth.auth.signOut();
  }
  isError;
  usuarios: any;
  userAux: any;
  validarUsuario() {

    var b = false;

    this.Conexion.listaUsuario().subscribe(usuario2 => {

      this.usuarios = usuario2;

      this.usuarios.forEach(userf => {
        if (userf.usuario == this.usuario && userf.pass == this.password) {
          this.userExist = true;
          this.userAux = userf;
          this.phoneCode.phoneNumber.country = '57';
          this.phoneCode.phoneNumber.number = userf.cel;
          console.log(userf.cel)
          this.phoneCode.sendLoginCOde();



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
  verifyLoginCode(){
    this.phoneCode.verificationCode = this.verificationCode;
    this.phoneCode.verfyLogin(this.userAux)   

  }
}