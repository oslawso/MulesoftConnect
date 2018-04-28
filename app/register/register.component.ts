import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/user';

@Component({
    templateUrl: 'app/register/register.component.html'
})

export class RegisterComponent implements OnInit {
    model: User = new User("","","");
    loading = false;
    registerFlag = true;

    public userId: number;

    constructor(
        private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private alertService: AlertService) { }

    ngOnInit() {
        
        this.userId = Number.parseInt(this.route.snapshot.paramMap.get('userId')) || 12345;
        this.getAccount();
        
    }

    getUsage() {
        this.router.navigate(['/account/usage', this.userId]);
    }

    getAccount() {
        this.loading = true;
        this.userService.getById(this.userId)
            .subscribe(
                data => {
                    this.model = data;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
