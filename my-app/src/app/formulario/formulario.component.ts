import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';

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
    direccion: ''
  }
  constructor(private conexion: ConexionService) { 
    this.conexion.listaUsuario().subscribe(usuario =>{
      this.usuarios = usuario;
      console.log(this.usuarios);
    })
  }

  ngOnInit() {
  }
  agregarUsuario(){
    this.conexion.agregarUsuario(this.user);
    this.user.nombre = '';
    this.user.usuario = '';
    this.user.pass = '';
    this.user.cel = '';
    this.user.cedula = '';
    this.user.dateCedula = '';
    this.user.residencia = '';
    this.user.direccion = '';
  }

}
