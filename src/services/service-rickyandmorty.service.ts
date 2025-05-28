import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceRickyandmortyService {
  private apiUrlCharacter = 'https://rickandmortyapi.com/api/character';
  private apiUrlEpisode = 'https://rickandmortyapi.com/api/episode';
  constructor(private http:HttpClient) { }

  getCharacters(): Observable<any[]>{
    const endpoint = this.apiUrlCharacter;
    return this.http.get<any[]>(endpoint);
  }

  getEpisodes(): Observable<any[]>{
    const endpoint = this.apiUrlEpisode;
    return this.http.get<any[]>(endpoint);
  }

  getCharactersByUrl(url: string): Observable<any>{
    return this.http.get<any>(url);
  }
}
