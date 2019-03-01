import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Usuario {
  nombre: string;
  usuario: string;
  pass: string;
  cel: string;
  cedula: string;
  dateCedula: string;
  residencia: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;

  private usuarioDoc: AngularFirestoreDocument<Usuario>;

  apiKey= '1803|A44qTKpbiTJtSUfz^KW2OTpKCAX286nC';
  URI:string= ''

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.usuariosCollection = afs.collection<Usuario>('usuarios');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))

    );

    var Paises= ['Colombia','Peru','EU']
      var eleccion: string=""
    if(eleccion=== "Colombia"){
      pais={
        siglas:"COP",
        nombre: "Colombia"
      }
    }else{}

    var pais={
      siglas:"COP",
      nombre: "Colombia"
    }

    this.URI = `https://free.currencyconverterapi.com/api/v6/convert?compact=ultra&apiKey=8137278e08fdd26d497d&q=USD_${pais.siglas}`
    console.log(this.URI);
    
      this.http.get(this.URI).subscribe((Result)=>{

        let key = Object.keys(Result);

        console.log( ""+ 30  * Number(Result[key[0]]));
      
      })

    


  }
  listaUsuario(){
    return this.usuarios;
  }
  agregarUsuario(usuario: Usuario){
    this.usuariosCollection.add(usuario);
  }
}
