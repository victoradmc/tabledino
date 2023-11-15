import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSubscription!: Subscription;

  constructor( private authService: AuthService ) {

  }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe( user => {
      this.isAuthenticated = !user ? false : true;
      console.log( user );
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
