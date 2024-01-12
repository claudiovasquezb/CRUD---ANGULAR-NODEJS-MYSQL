import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:4000/api/notes';
  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }
  getNote(id: number): Observable<Note> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Note>(url);
  }
  postNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(id: number, note: Note): Observable<Note> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Note>(url, note);
  }

  deleteNote(id: number): Observable<Note> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Note>(url);
  }

}
