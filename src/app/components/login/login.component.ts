import { Component } from '@angular/core';
import { User } from 'src/app/models/user.models';

import { AuthService } from 'src/app/services/auth.service';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  }

  newUser = {
    email: '',
    password: '',
    repeatPassword: '',
    isValid: false,
    isLoading: false
  }

  displayNewUserDialog: boolean = false;

  constructor( 
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router ) {}

  ngOnInit(){
  }

  toggleNewUserDialog(): void {
    this.displayNewUserDialog = !this.displayNewUserDialog;

    if ( !this.displayNewUserDialog ) {
      this.newUser.email = '';
      this.newUser.password = '';
      this.newUser.repeatPassword = '';
      this.newUser.isValid = false;
      this.newUser.isLoading = false;
    }
  }

  handleLogin(): void {
    this.authService.login( this.user.email, this.user.password ).subscribe({
      next: ( response ) => {
        this.router.navigate(['/']);
      }, 
      error: ( errorMessage ) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      }
    });
  }

  validateNewUser(): void {
    if ( this.newUser.email != '' && this.newUser.password != '' ) {
      if ( this.newUser.password === this.newUser.repeatPassword ) {
        this.newUser.isValid = true;
      }
    }
  }

  handleSingUp(): void {
    this.newUser.isLoading = true;
    this.authService.signUp( this.newUser.email, this.newUser.password ).subscribe({
      next: () => {
        this.newUser.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New User Created!' });
        this.toggleNewUserDialog();
      }, 
      error: ( errorMessage ) => {
        this.newUser.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      }
    });

  }



}
