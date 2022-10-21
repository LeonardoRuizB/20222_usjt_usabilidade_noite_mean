import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';

const routes: Routes = [
  //localhost:4200/ => renderizar a lista
  { path: " ", component: ClienteListaComponent },
  //localhost:4200/criar => exibir o componente de cadastro
  { path: 'criar', component: ClienteListaComponent },
  //localhost:4200/editar/123456 => exibir o componente de cadastro
  { path: 'editar/:idCliente', component: ClienteListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
