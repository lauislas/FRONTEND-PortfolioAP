import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../models/courses';


const httpOptions =
{
  headers: new HttpHeaders
    ({ 'Content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl: string = "https://portfolioargp.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }

  getCourse(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(this.apiUrl + 'course/list', httpOptions);
  }

  addCourse(course: Courses): Observable<Courses[]> {
    return this.httpClient.post<Courses[]>(this.apiUrl + 'course/new', course, httpOptions);
  }

  updateCourse(course: Courses): Observable<Courses[]> {
    return this.httpClient.put<Courses[]>(this.apiUrl + 'course/update', course, httpOptions);

  }

  deleteCourse(id: number): Observable<Courses[]> {
    return this.httpClient.delete<Courses[]>(this.apiUrl + 'course/delete/' + id, httpOptions);
  }

}
