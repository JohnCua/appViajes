import { Injectable } from '@angular/core';
import { MetodosBase } from '../api/MetodosBase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends MetodosBase {

  constructor( private http: HttpClient) { super(http); }

  getCategorias() {
    return this.get('categoria');
  }

  createCategoriaDestino(data: any) {
    return this.post(`categoria/destino`, data);
  }
}
