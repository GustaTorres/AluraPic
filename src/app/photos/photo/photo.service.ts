import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from './photo';

const API = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class PhotoService {

    constructor(private http: HttpClient) {}

    public listFromUser(userName: string): Observable<Photo[]> {
       return this.http.get<Photo[]>(`${API}/${userName}/photos`);
    }

}