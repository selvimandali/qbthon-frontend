import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event, User } from './eventinfo.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private eve: Event;
    private selectedTab: string;

    private backendUrlEvent: string = 'http://localhost:9001/event';
    private backendUrlQuestion: string = 'http://localhost:9002/question';
    constructor(private httpClient: HttpClient) { }




    getSelectedTab(): string {
        return this.selectedTab;
    }

    setSelectedTab(value: string) {
        this.selectedTab = value;
    }
    setEvent(event: Event) {
        this.eve = event;
    }
    getEvent(): Event {
        return this.eve;
    }

    createEvent(files: FormData) {
        return this.httpClient.post(this.backendUrlEvent + '/create', files, { responseType: 'text' });
    }

    getEventsDetailsOfType(userId) {
        let params = new HttpParams();
        params = params.append('userId', userId);
        console.log(params);
        return this.httpClient.get(this.backendUrlEvent + '/details/type', { params: params });
    }

    getNominated(eventType, userId, eventId) {
        let params = new HttpParams();
        params = params.append('eventId', eventId);
        params = params.append('eventType', eventType);
        params = params.append('userId', userId);
        return this.httpClient.get(this.backendUrlEvent + '/nominate', { params: params });
    }

    getEarlyBirds(id: string):Observable<User[]>{
        return this.httpClient.get<User[]>(this.backendUrlEvent + '/earlybirds/'+ id, {});
    }

    getVoucherList(id: string):Observable<User[]>{
        return this.httpClient.get<User[]>(this.backendUrlEvent + '/evoucher/'+ id, {});
    }


    sendReminderMail(id: string){
        return this.httpClient.post(this.backendUrlEvent +'/sendReminderMail',id,{});
    }

    sendEducatorMail(id: string){
        return this.httpClient.post(this.backendUrlEvent +'/sendEducatorMail',id,{});
    }

    createQuestionnaire(files: FormData) {
        return this.httpClient.post(this.backendUrlQuestion + '/create', files, { responseType: 'text' });
    }

    getQuestionsMapList(eventId):Observable<any>{
        let params = new HttpParams();
        params = params.append('eventId', eventId);
        return this.httpClient.get<any>(this.backendUrlQuestion + '/all', { params: params });
    }
    getQuestionsExcelList(eventId):Observable<any[]>{
        let params = new HttpParams();
        params = params.append('eventId', eventId);
        return this.httpClient.get<any[]>(this.backendUrlQuestion + '/download/all', { params: params });
    }
    updateQuestion(question):Observable<any[]>{
        let params = new HttpParams();
        params = params.append('questionare', question);
        return this.httpClient.post<any[]>(this.backendUrlQuestion + '/update/question',{params: params });
    }
}