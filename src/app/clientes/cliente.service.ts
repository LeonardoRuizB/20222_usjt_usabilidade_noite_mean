import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Cliente } from "./cliente.model";
import { HttpClient } from '@angular/common/http';

//single source of truth
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private listaClientesAtualizada = new Subject<Cliente[]>();


  private clientes: Cliente[] = [
    {
      nome: 'Ana',
      fone: '12345678',
      email: 'ana@email.com'
    }
  ]

  constructor(private httpClient: HttpClient) { }

  getClientes(): void {
    this.httpClient.get<{
      mensagem: string, clientes:
        Cliente[]
    }>('http://localhost:3000/api/clientes').subscribe(
      (dados) => {
        this.clientes = dados.clientes;
        this.listaClientesAtualizada.next([...this.clientes]);
      }
    )
  }

  adicionarCliente(nome: string, fone: string, email: string): void {
    const cliente: Cliente = { nome, fone, email }
    const url = 'http://localhost:3000/api/clientes'
    this.httpClient.post<{mensagem: string}>(url, cliente)
    .subscribe((dados) => {
      console.log(dados.mensagem)
      this.clientes.push(cliente)
      this.listaClientesAtualizada.next([...this.clientes]);
    })
  }
  getListaDeClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }
}
