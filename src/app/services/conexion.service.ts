import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

export interface Usuario {
  nombre:string,    
  usuario:string,  
  pass:string,    
  cel:string,    
  cedula:string,    
  dateCedula:string,      
  residencia:string,    
  direccion:string
}

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;
  private usuario = '';
  private password = '';
  private usuarioDoc: AngularFirestoreDocument<Usuario>;

  constructor(private afs: AngularFirestore) { 
    this.usuariosCollection = afs.collection<Usuario>('usuarios');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))

    );
  }
  listaUsuario(){
    return this.usuarios;
  }
  agregarUsuario(usuario: Usuario){
    this.usuariosCollection.add(usuario);
  
  }  
}
