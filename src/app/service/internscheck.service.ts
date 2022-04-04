import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckInOut } from '../models/checkInOut.model';

@Injectable({
  providedIn: 'root'
})
export class InternscheckService {

  baseUrl = 'https://clockinternsfcsamerica.azurewebsites.net//api/internsCheck';

  constructor(private http: HttpClient) { }

  getAllCheckInOuts(): Observable<CheckInOut[]> {
    return this.http.get<CheckInOut[]>(this.baseUrl);
  }

  addNewCheck(check: CheckInOut): Observable<CheckInOut> {

    //les 000000..... sei pur un default id parck on use guid from the API
    check.id = '00000000-0000-0000-0000-000000000000';

    return this.http.post<CheckInOut>(this.baseUrl, check);
  }

  deleteC(id: string): Observable<CheckInOut>{
    return this.http.delete<CheckInOut>(this.baseUrl + '/' + id);
  }

  updateInfoCheck(check: CheckInOut): Observable<CheckInOut>{
    return this.http.put<CheckInOut>(this.baseUrl + '/' + check.id, check);
  }

}
