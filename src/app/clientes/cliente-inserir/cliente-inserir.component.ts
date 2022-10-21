import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css']
})

export class ClienteInserirComponent implements OnInit{

  private modo: string = "criar";
  private idCliente: string;
  constructor(
    private clienteService: ClienteService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("idCliente")){
        //estamos em modo de edição
        this.modo = "editar"
        this.idCliente = paramMap.get("idCliente")
      }
      else{
        //estamos em modo de cadastro
        this.modo = "criar"
        this.idCliente = null
      }
    })
  }

  onAdicionarCliente(form: NgForm) {
    if (form.invalid) return
    this.clienteService.adicionarCliente(
      form.value.nome,
      form.value.fone,
      form.value.email
    )
    form.resetForm();
  }

}
