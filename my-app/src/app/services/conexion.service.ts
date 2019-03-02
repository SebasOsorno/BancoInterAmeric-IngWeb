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

    var Paises= ['Colombia','Mexico','EU','Chile','Brasil','Ecuador','Bolivia','Uruguay']
      var eleccion: string=""
      var pais={
        siglas:"COP",
        nombre: "Colombia"
      }
    if(eleccion=== 'Colombia'){
     var pais={
        siglas:"COP",
        nombre: "Colombia"
      }
    }else if(eleccion==='Mexico'){

      var pais={
        siglas:"MXN",
        nombre: "Mexico"
      }
      
    }else if(eleccion==='EU'){

      pais={
        siglas:"USD",
        nombre: "EStadosUnidos"
      }

    }else if (eleccion==='Chile'){

      pais={
        siglas:"CLP",
        nombre: "Chile"
      }

    }else if (eleccion==='Brasil'){

      pais={
        siglas:"BRL",
        nombre: "Brasil"
      }

    }else if(eleccion==='Ecuador'){

      pais={
        siglas:"ECS",
        nombre: "Ecuador"
      }

    }else if(eleccion==='Bolivia'){

      pais={
        siglas:"BOB",
        nombre: "Bolivia"
      }

    }else if(eleccion==='Uruguay'){

      pais={
        siglas:"UYU",
        nombre: "Uruguay"
      }

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
