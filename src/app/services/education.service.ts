import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../models/education';

const httpOptions =
{
  headers: new HttpHeaders
    ({ 'Content-type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiUrl: string = "https://portfolioargp.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }

  getEducation(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.apiUrl + 'education/list', httpOptions);
  }

  addEducation(education: Education): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'education/new', education, httpOptions);
  }

  updateEducation(education: Education): Observable<any> {
    return this.httpClient.put(this.apiUrl + 'education/update', education, httpOptions);
  }

  deleteEducaction(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + 'education/delete/' + id, httpOptions);
  }
}
