import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  rootUrl: string = "/api/users/";

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.rootUrl);
  }

  deleteUserbyId(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.rootUrl + id + '/delete');
  }

  createNewUser(user: User): Observable<boolean>{
    return this.http.post<boolean>(this.rootUrl, user);
  }

  updateUser(user: User): Observable<boolean>{
    return this.http.put<boolean>(this.rootUrl, user);
  }

}
