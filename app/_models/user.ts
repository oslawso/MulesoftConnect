import { Address } from './address';
import { OnInit } from '@angular/core';
export class User implements OnInit {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    address: Address;
    phone: string;
    email: string;
    ssn: string;
    dateOfBirth: string;
    password: string;

    constructor(id: string, firstName: string, lastName: string) {
        this.address = new Address();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    ngOnInit() { 
    }
}