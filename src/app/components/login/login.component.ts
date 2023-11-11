import { Component } from '@angular/core';
import { User } from 'src/app/models/user.models';

import { AuthService } from 'src/app/services/auth.service';
import { Message, MessageService } from 'primeng/api';

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
    private messageService: MessageService ) {}

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
    console.log( this.user );
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
    this.authService.signUp( this.newUser.email, this.newUser.password ).subscribe( response => {
      console.log( response )
      this.newUser.isLoading = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New User Created!' });
      this.toggleNewUserDialog();
    }, error => {
      console.log( error );
    });
  }

}
