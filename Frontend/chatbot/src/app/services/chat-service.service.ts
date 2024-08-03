import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatBot, Menu, TopStocks } from '../models/chat-json';
//import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  URL: string = 'http://localhost:3001';
  constructor(private httpClient: HttpClient) { }

  getJson(): Observable<ChatBot[]> {
    return this.httpClient.get<ChatBot[]>(this.URL);
  }

  getStockGroups(): Observable<ChatBot[]> {
    return this.httpClient.get<ChatBot[]>(`${this.URL}/stock-group`);
  }

  getStockOptions(group: string): Observable<TopStocks[]> {
    return this.httpClient.get<TopStocks[]>(`${this.URL}/stock-group/${group}`);
  }

  getFinalMenu(stock: string): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.URL}/stock/${stock}`);
  }

}
