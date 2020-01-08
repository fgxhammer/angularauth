import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events"
  private _specialEventsUrl = "http://localhost:3000/api/specialEvents"

  constructor(private _http: HttpClient) { }

  getEvents() {
    return this._http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() {
    return this._http.get<any>(this._specialEventsUrl)
  }

}
