import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hskills } from '../models/h-skills';

const httpOptions =
{
  headers: new HttpHeaders
    ({ 'Content-type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class HSkillsService {
  private apiUrl: string = "https://portfolioargp.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }

  getHSkill(): Observable<Hskills[]> {
    return this.httpClient.get<Hskills[]>(this.apiUrl + 'hSkill/list', httpOptions);
  }

  addHSkill(hSkill: Hskills): Observable<Hskills[]> {
    return this.httpClient.post<Hskills[]>(this.apiUrl + 'hSkill/new', hSkill, httpOptions);
  }

  updateHSkill(hSkill: Hskills): Observable<Hskills[]> {
    return this.httpClient.put<Hskills[]>(this.apiUrl + 'hSkill/update', hSkill, httpOptions);
  }

  deleteHSkill(id: number): Observable<Hskills[]> {
    return this.httpClient.delete<Hskills[]>(this.apiUrl + 'hSkill/delete/' + id, httpOptions);
  }
}
