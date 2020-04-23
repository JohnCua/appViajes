import { Injectable } from '@angular/core';
import { MetodosBase } from '../api/MetodosBase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends MetodosBase {

  constructor( private http: HttpClient) { super(http); }

  getCategorias(filtro) {
    return this.get('categoria', filtro);
  }

  getCategoria(categoria_id) {
    return this.get(`categoria${categoria_id}`);
  }

  createCategoria(data: any) {
    return this.post(`categoria`, data);
  }

  updateCategoria(categoria_id,data: any) {
    return this.post(`categoria${categoria_id}`, data);
  }

  deleteCategoria(categoria_id) {
    return this.delete(`categoria${categoria_id}`);
  }

  createCategoriaDestino(data: any) {
    return this.post(`categoria/destino`, data);
  }


}
