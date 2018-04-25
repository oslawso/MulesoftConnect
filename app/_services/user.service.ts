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
        return this.http.get('/api/users/' + id);
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

    getUsage(id: number) {
        // return JSON.stringify(this.http.get('https://mocksvc.mulesoft.com/mocks/3f8bb2b7-fadd-4a39-b3c4-912afc5c54fc/usage?customerID=' + id + 'f&planId=et4t2&fromDate=2018-04-13&toDate=2018-04-13'));
        return this.http.get<any>(
            'https://mocksvc.mulesoft.com/mocks/3f8bb2b7-fadd-4a39-b3c4-912afc5c54fc/usage?customerID=' + id + 'f&planId=et4t2&fromDate=2018-04-13&toDate=2018-04-13',
            {responseType: 'json'}
        );
    }
}