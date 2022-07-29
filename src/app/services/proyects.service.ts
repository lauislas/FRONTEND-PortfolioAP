import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyects } from '../models/proyects';


const httpOptions =
{
  headers: new HttpHeaders
    ({ 'Content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {

  private apiUrl: string = "https://portfolioargp.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }

  getProyect(): Observable<Proyects[]> {
    return this.httpClient.get<Proyects[]>(this.apiUrl + 'proyect/list', httpOptions);
  }

  addProyect(proyect: Proyects):  Observable<Proyects[]> {
    return this.httpClient.post<Proyects[]>(this.apiUrl + 'proyect/new', proyect, httpOptions);
  }

  updateProyect(proyect: Proyects): Observable<Proyects[]> {
    return this.httpClient.put<Proyects[]>(this.apiUrl + 'proyect/update', proyect, httpOptions);
  }

  deleteProyect(id: number):  Observable<Proyects[]> {
    return this.httpClient.delete<Proyects[]>(this.apiUrl + 'proyect/delete/' + id, httpOptions);
  }

}
