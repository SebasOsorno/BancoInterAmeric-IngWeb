import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';
import { CodeAuthenticationComponent } from './code-authentication/code-authentication.component';
import { RetiroComponent } from './retiro/retiro.component';
import { ConsignacionComponent } from './consignacion/consignacion.component';
import { TransferenciasComponent } from './transferencias/transferencias.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: 'usuario', component: UserDetailsComponent},
  { path: 'registro', component: FormularioComponent },
  { path: 'phone-auth', component: CodeAuthenticationComponent },
  { path: 'retiro', component: RetiroComponent },
  { path: 'consignacion', component: ConsignacionComponent },
  { path: 'transferencias', component: TransferenciasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
