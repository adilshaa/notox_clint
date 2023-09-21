import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  backendUrl: string = 'http://localhost:3000/';
  subUrl: string = 'user/';

  constructor(private http: HttpClient) {}

  loginUser(data: any) {
    return this.http.post(`${this.backendUrl + this.subUrl}signin`, data, {
      withCredentials: true,
    });
  }
  signInUser(data: any) {
    return this.http.post(`${this.backendUrl + this.subUrl}signup`, data, {
      withCredentials: true,
    });
  }
  authenticateUser() {
    return this.http.get(`${this.backendUrl + this.subUrl}authenticating`);
  }
  getNotes() {
    return this.http.get(`${this.backendUrl + this.subUrl}notes`, {
      withCredentials: true,
    });
  }
  addNote() {
    return this.http.get(`${this.backendUrl + this.subUrl}addnote`);
  }
  updateDesc(text: string, id: string) {
    let texts = {
      text: text,
    };

    return this.http.post(
      `${this.backendUrl + this.subUrl}updatenotsdesc/${id}`,
      texts,
      {
        withCredentials: true,
      }
    );
  }
  updateTitle(text: string, id: string) {
    let texts = {
      text: text,
    };
    return this.http.post(
      `${this.backendUrl + this.subUrl}updatenotstitle/${id}`,
      texts,
      {
        withCredentials: true,
      }
    );
  }
  deleteNote(id: string) {
   return this.http.delete(`${this.backendUrl + this.subUrl}deleteNote/${id}`);
  }
}
