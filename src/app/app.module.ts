import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { CodeAuthenticationComponent } from './code-authentication/code-authentication.component';
import { RetiroComponent } from './retiro/retiro.component';
import { ConsignacionComponent } from './consignacion/consignacion.component';
import { TransferenciasComponent } from './transferencias/transferencias.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarComponent } from './mat-toolbar/mat-toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AdminViewComponent } from './admin-view/admin-view.component';


  const routes: Routes = [
    { path: '', redirectTo: '/registro', pathMatch: 'full' },
    { path: 'usuario', component: UserDetailsComponent},
    //{ path: 'registro', component: FormularioComponent },
    { path: 'phone-auth', component: CodeAuthenticationComponent },
    { path: 'retiro', component: RetiroComponent },
    { path: 'consignacion', component: ConsignacionComponent },
    { path: 'transferencias', component: TransferenciasComponent },
    { path: 'admin', component: AdminViewComponent },
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    CodeAuthenticationComponent,
    RetiroComponent,
    ConsignacionComponent,
    TransferenciasComponent,
    UserDetailsComponent,
    MatToolbarComponent,
    LoginComponent,
    RegisterComponent,
    AdminViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
