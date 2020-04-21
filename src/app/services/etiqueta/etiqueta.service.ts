import { Injectable } from '@angular/core';
import { MetodosBase } from '../api/MetodosBase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService extends MetodosBase {

  constructor( private http: HttpClient) { super(http); }

  getEtiquetas() {
    return this.get('etiqueta');
  }

  createEtiquetaTour(data: any) {
    return this.post(`etiqueta/tour`, data);
  }
}
