import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get<User>(
            'https://mocksvc.mulesoft.com/mocks/e15bca7d-1796-4623-bf65-082382bc2994/customers/' + id,
            {responseType: 'json'}
        );
    }

    create(user: User) {
        console.log(user);
        return this.http.post('http://localhost:8061/api/users', JSON.stringify(user));
    }

    update(user: User) {
        console.log(JSON.stringify(user));
        return this.http.put('http://localhost:8061/api/users/' + user.id, JSON.stringify(user));
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }

    getUsage(uId: number, cStartDate: string, cEndDate: string, cType: string) {
        // return JSON.stringify(this.http.get('https://mocksvc.mulesoft.com/mocks/3f8bb2b7-fadd-4a39-b3c4-912afc5c54fc/usage?customerID=' + id + 'f&planId=et4t2&fromDate=2018-04-13&toDate=2018-04-13'));
        return this.http.get<any>(
            // 'https://yselvaraj.localhost.run/api/usage?customerID=23&planId=312&fromDate=2018-04-01&toDate=2018-04-01&usagetype=intra-day',
            'https://yselvaraj.localhost.run/api/usage?customerID=' + uId + '&planId=312&fromDate=' + cStartDate + '&toDate=' + cEndDate + '&usagetype=' + cType,
            // 'https://mocksvc.mulesoft.com/mocks/3f8bb2b7-fadd-4a39-b3c4-912afc5c54fc/usage?customerID=' + uId + 'f&planId=et4t2&fromDate=' + cStartDate + '&toDate=' + cEndDate,
            {responseType: 'json'}
        );
    }
}