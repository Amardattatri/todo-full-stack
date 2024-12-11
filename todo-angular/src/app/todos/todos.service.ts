import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private readonly API_URL = `${environment.apiBaseUrl}/todos`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
  }

  getTodos(): Observable<any> {
    return this.http.get(this.API_URL, {headers: this.getAuthHeaders()});
  }

  createTodo(todo: {title: string, description: string, completed: boolean}) : Observable<any> {
    return this.http.post(this.API_URL, todo, {headers: this.getAuthHeaders()}); 
  }

  updateTodo(id: number,todo: {title: string, description: string, completed: boolean}) : Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, todo, {headers: this.getAuthHeaders()}); 
  }

  deleteTodo(id: number) : Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}` , {headers: this.getAuthHeaders()}); 
  }
}
