import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';

const httpOptions =
{
  headers: new HttpHeaders
    ({ 'Content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl: string = "https://portfolioargp.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }

  getExperience(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(this.apiUrl + 'experience/list', httpOptions);
  }

  addExperience(experience: Experience): Observable<Experience[]> {
    return this.httpClient.post<Experience[]>(this.apiUrl + 'experience/new', experience, httpOptions);
  }

  updateExperience(experience: Experience): Observable<Experience[]> {
    return this.httpClient.put<Experience[]>(this.apiUrl + 'experience/update', experience, httpOptions);

  }

  deleteExperience(id: number): Observable<Experience[]> {
    return this.httpClient.delete<Experience[]>(this.apiUrl + 'experience/delete/' + id, httpOptions);
  }
}
