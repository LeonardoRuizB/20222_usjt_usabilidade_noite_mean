import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Cliente } from "./cliente.model";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//single source of truth
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private listaClientesAtualizada = new Subject<Cliente[]>();


  private clientes: Cliente[] = [
    {
      id: null,
      nome: 'Ana',
      fone: '12345678',
      email: 'ana@email.com'
    }
  ]

  constructor(private httpClient: HttpClient) { }

  getClientes(): void {
    this.httpClient.get<{ mensagem: string, clientes: any }>('http://localhost:3000/api/clientes')
      .pipe(map((dados) => {
        return dados.clientes.map(cliente => {
          return {
            id: cliente._id,
            nome: cliente.nome,
            fone: cliente.fone,
            email: cliente.email
          }
        })
      }))
      .subscribe(
        (clientes) => {
          this.clientes = clientes;
          this.listaClientesAtualizada.next([...this.clientes]);
        }
      )
  }

  getCliente(idCliente: string){
    return { ...this.clientes.find(cli => cli.id === idCliente) }
  }

  adicionarCliente(nome: string, fone: string, email: string): void {
    const cliente: Cliente ={
      id: " ", nome, fone, email
    }
    const url = 'http://localhost:3000/api/clientes'
    this.httpClient.post<{ mensagem: string, id: string }>(url, cliente)
      .subscribe((dados) => {
        cliente.id = dados.id
        this.clientes.push(cliente)
        this.listaClientesAtualizada.next([...this.clientes]);
      })
  }
  getListaDeClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }

  removerCliente(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`).subscribe(() => {
      console.log(`Cliente de id: ${id} removido`);
      this.clientes = this.clientes.filter((cli) => cli.id !== id )
      this.listaClientesAtualizada.next([...this.clientes])
    });
  }
}
