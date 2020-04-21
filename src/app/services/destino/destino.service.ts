import { Injectable } from '@angular/core';
import { MetodosBase } from '../api/MetodosBase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DestinoService extends MetodosBase {

  constructor(private http: HttpClient) {
    super(http);
  }

  getDestinos(filtro: any) {
    return this.get('destino', filtro);
  }

  getDestino(destino_id) {
    return this.get(`destino/${destino_id}`);
  }

  createDestino(data: any) {
    return this.post(`destino`, data);
  }

  updateDestino(destino_id, data) {
    return this.put(`destino/${destino_id}`, data);
  }

  getPaises(pais_id) {
    return this.get(`pais/${pais_id}`);
  }

  getLugaresSelect(filter: any) {
    return this.get(`lugar`, filter);
  }

  deleteDestino(destino_id: any) {
    return this.delete(`destino/${destino_id}`);
  }

}
