import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skills } from '../models/skills';



const httpOptions =
{
  headers: new HttpHeaders
    ({ 'Content-type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  
  private apiUrl: string = "https://portfolioargp.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }


   getSkills(): Observable<Skills[]> {
    return this.httpClient.get<Skills[]>(this.apiUrl + 'skill/list', httpOptions);
  }


  addSkill(skill: Skills): Observable<Skills[]> {
    return this.httpClient.post<Skills[]>(this.apiUrl + 'skill/new', skill, httpOptions);
  }

  updateSkill(skill: Skills): Observable<Skills[]> {
    return this.httpClient.put<Skills[]>(this.apiUrl + 'skill/update', skill, httpOptions);

  }

  deleteSkill(id: number): Observable<Skills[]> {
    return this.httpClient.delete<Skills[]>(this.apiUrl + 'skill/delete/' + id, httpOptions);
  }

}
