import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient) { }
    getEmplpyees(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/employee');
    }
    getEmplpyeebyId(ID: number){
        return this.http.get('http://localhost:3000/employee/'+ID);
    }
    getCheckData(){
        return this.http.get('http://localhost:3000/checkdata');
    }
}