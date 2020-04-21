import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetodosBase } from '../api/MetodosBase';

@Injectable({
  providedIn: 'root'
})
export class TourService extends MetodosBase {

  constructor(private http: HttpClient) { super(http); }

  getTours(filtro: any) {
    return this.get('tour', filtro);
  }

  getTour(tour_id) {
    return this.get(`tour/${tour_id}`);
  }

  createTour(data) {
    return this.post(`tour`, data);
  }

  editTour(tour_id, data) {
    return this.put(`tour/${tour_id}`, data);
  }

  deleteTour(tour_id) {
    return this.delete(`tour/${tour_id}`);
  }

}
