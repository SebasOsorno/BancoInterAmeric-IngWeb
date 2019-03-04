import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormularioComponent } from '../formulario/formulario.component';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.css']
})


export class MatToolbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  user;
  userAdmin = false;
  userLogin = false;

  constructor(private breakpointObserver: BreakpointObserver, public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore) {
    this.afAuth.authState.subscribe(resp => {
      
      
      if (resp) {

        this.userLogin = true;
        this.user = this.fireStore.collection("usuarios", ref =>
          ref.where("uid", "==", auth().currentUser.uid))
        this.user.valueChanges().subscribe(data => {
          console.log(data);
          if (data.admin) {
            this.userAdmin = true;
          }
        });
      } else {
        this.userLogin = false
      }
    });



  }


  signOut(){
    auth().signOut().then(function() {
      // Sign-out successful.
      this.userAdmin = false;
      this.userLogin = false;
      alert("Cierre de sesión");
    }).catch(function(error) {
      // An error happened.
    });
  }

}
