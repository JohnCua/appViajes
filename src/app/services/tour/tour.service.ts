import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetodosBase } from '../api/MetodosBase';

@Injectable({
  providedIn: 'root'
})
export class TourService extends MetodosBase {

  constructor(private http:HttpClient) { super(http); }

  getTours(filtro:any){
    return this.get('tour',filtro);
  }

}
