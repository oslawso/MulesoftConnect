import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    
    isLoggedIn$: Observable<boolean>; 

    // loggedIn = false;

    constructor(private authService: AuthenticationService) { }

    ngOnInit(){
        
        this.isLoggedIn$ = this.authService.isLoggedIn;

        // if(localStorage.getItem('currentUser') != null) {
        //     this.loggedIn = true;
        // }
    }
 }