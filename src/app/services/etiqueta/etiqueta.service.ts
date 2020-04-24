import { Injectable } from '@angular/core';
import { MetodosBase } from '../api/MetodosBase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService extends MetodosBase {

  constructor( private http: HttpClient) { super(http); }

  getEtiquetas(filtro) {
    return this.get('etiqueta',filtro);
  }


  getEtiqueta(etiqueta_id) {
    return this.get(`etiqueta/${etiqueta_id}`);
  }

  createEtiqueta(data: any) {
    return this.post(`etiqueta`, data);
  }

  updateEtiqueta(etiqueta_id, data: any) {
    return this.put(`etiqueta/${etiqueta_id}`, data);
  }

  deleteEtiqueta(etiqueta_id) {
    return this.delete(`etiqueta/${etiqueta_id}`);
  }

  createEtiquetaTour(data: any) {
    return this.post(`etiqueta/tour`, data);
  }

}
