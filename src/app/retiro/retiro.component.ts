import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent implements OnInit {
  user;
  constructor(private fireStore: AngularFirestore, private Conexion: ConexionService) { }
  valorRetirar: number;
  ngOnInit() {
  }
  usuarios: any;
  userAux: any;
  realizarRetiro() {




    this.Conexion.listaUsuario().subscribe(usuario2 => {

      this.usuarios = usuario2;

      this.usuarios.forEach(userf => {
        if (userf.uid == auth().currentUser.uid) {
          // this.userExist = true;
          this.userAux = userf;
          // this.phoneCode.phoneNumber.country = '57';
          // this.phoneCode.phoneNumber.number = userf.cel;
          // console.log(userf.cel)
          // this.phoneCode.sendLoginCOde();







        }
      });



      if (parseInt(this.userAux.monto) >= this.valorRetirar) {
        console.log('tiene el dinero suficiente para realizar el retiro');
      } 
      if(parseInt(this.userAux.monto) < this.valorRetirar)
      {
        console.log('no tiene suficiente direno para realizar el retirop pobre')
      }

      console.log('el dinero que tiene en su cuenta es: '+parseInt(this.userAux.monto));
      console.log('el dinero que desea retirar es: '+this.valorRetirar);
      console.log('el valor que queda en su cuenta es de: '+(parseInt(this.userAux.monto)-this.valorRetirar));

    })





  }


}
