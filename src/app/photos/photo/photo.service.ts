import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const API = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class PhotoService {

    constructor(private http: HttpClient) {}

    public listFromUser(userName: string): Observable<Photo[]> {
       return this.http.get<Photo[]>(`${API}/${userName}/photos`);
    }

    public listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {
        const params: HttpParams = new HttpParams().append('page',page.toString());

        return this.http.get<Photo[]>(`${API}/${userName}/photos`,{ params });
    }

    public upload(description : string, allowComments: boolean, file: File ): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('description',description);
        formData.append('allowComments',allowComments.toString());
        formData.append('imageFile',file);

        return this.http.post(`${API}/photos/upload`,formData);
    }

    public findById(photoId: number): Observable<Photo> {
        return this.http.get<Photo>(`${API}/photos/${photoId}`);
    }

    public getComments(photoId: number): Observable<PhotoComment[]> {
        return this.http.get<PhotoComment[]>(`${API}/photos/${photoId}/comments`);
    }

    public addComments(photoId: number, commentText: string) {
        return this.http.post(`${API}/photos/${photoId}/comments`, { commentText });
    }

    public removePhoto(photoId: number) {
        return this.http.delete(`${API}/photos/${photoId}`);
    }

}