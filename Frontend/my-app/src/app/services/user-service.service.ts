import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  _url = "https://localhost:44317/api/User"
  constructor(
    private http:HttpClient
  ) {
    console.log("service")
   }
   getUsers(){
     let header = new HttpHeaders()
     .set('Type-content', 'aplications/json')
     return this.http.get(this._url, {
       headers:header
      });
   }
   postUsers(user:any){
     return this.http.post(this._url,user);
   }
   updateUser(user:any){
     return this.http.put(this._url + '?delete=false',user);
   }
   deleteUser(user:any){
     return this.http.put(this._url + '?delete=true',user);
   }
}
