import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = []
  clientesSubscription: Subscription;

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.clienteService.getClientes();
    this.clientesSubscription = this.clienteService
      .getListaDeClientesAtualizadaObservable()
      .subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
      });
  }
  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  onDelete (id: string): void{
    this.clienteService.removerCliente(id);
   }


}















  // clientes = [
  //   {
  //     nome: 'José',
  //     fone: '12345678',
  //     email: 'jose@email.com'
  //   },
  //   {
  //     nome: 'Maria',
  //     fone: '45454545',
  //     email: 'maria@email.com'
  //   },
  //   {
  //     nome: 'Pedro',
  //     fone: '77887744',
  //     email: 'pedro@email.com'
  //   }
  // ]
