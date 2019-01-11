import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(private http: HttpClient) { }

  public listFromUser(userName: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${API_URL}/${userName}/photos`);
  }

  public listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {
    const params: HttpParams = new HttpParams().append('page', page.toString());

    return this.http.get<Photo[]>(`${API_URL}/${userName}/photos`, { params });
  }

  public upload(description: string, allowComments: boolean, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments.toString());
    formData.append('imageFile', file);

    return this.http.post(
      `${API_URL}/photos/upload`,
      formData,
      {
        observe: 'events',
        reportProgress: true
      });
  }

  public findById(photoId: number): Observable<Photo> {
    return this.http.get<Photo>(`${API_URL}/photos/${photoId}`);
  }

  public getComments(photoId: number): Observable<PhotoComment[]> {
    return this.http.get<PhotoComment[]>(`${API_URL}/photos/${photoId}/comments`);
  }

  public addComments(photoId: number, commentText: string) {
    return this.http.post(`${API_URL}/photos/${photoId}/comments`, { commentText });
  }

  public removePhoto(photoId: number) {
    return this.http.delete(`${API_URL}/photos/${photoId}`);
  }

  public like(photoId: number) {
    return this.http.post(
      `${API_URL}/photos/${photoId}/like`, {}, { observe: 'response' }
    )
      .pipe(map(res => true))
      .pipe(catchError(err => {
        return err.status === 304 ? of(false) : throwError(err);
      }));
  }
}