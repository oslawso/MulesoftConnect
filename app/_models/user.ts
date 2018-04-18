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

    constructor() {
        this.address = new Address();
    }

    ngOnInit() { 
    }
}