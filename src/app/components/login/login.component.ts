import { Component } from '@angular/core';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password = '';

  ngOnInit(){
  }

  handleLogin(): void {
    console.log('eu vo logá');
  }

}
