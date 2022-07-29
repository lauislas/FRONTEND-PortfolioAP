import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from '../models/about';


const httpOptions =
{
  headers: new HttpHeaders
    ({ 'Content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  apiUrl: string = "https://portfolioargp.herokuapp.com/";

   constructor(private httpClient: HttpClient) { }

  getAbout(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'about/info',httpOptions);
  }

  addAbout(about: About): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'about/new', about, httpOptions);
  }

  updateAbout(about: About): Observable<any> {
    return this.httpClient.put<About[]>(this.apiUrl + 'about/update', about, httpOptions);

  }

}
