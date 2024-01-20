import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  addUser(data: any) {
    return this._http.post("http://localhost:3000/users", data)
  }

  getAllUsers() {
    return this._http.get("http://localhost:3000/users")
  }

  getUser(id: string){
    return this._http.get(`http://localhost:3000/users/${id}`)
  }

  deleteUser(id: string) {
    return this._http.delete(`http://localhost:3000/users/${id}`)
  }

  updateUser(id: string, data: any) {
    return this._http.put(`http://localhost:3000/users/${id}`, data)
  }
}
