import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    // moduleId: module.id,
    templateUrl: 'app/home/home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(
        private userService: UserService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    getUsage(userId: string) {
        this.router.navigate(['/account/usage', userId]);
    }

    private loadAllUsers() {
        this.users = [
            new User("23","John","Doe"),
            new User("23","Jean","Lee"),
            new User("23", "Karl", "Dell")
        ];
    }
}