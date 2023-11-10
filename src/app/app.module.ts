import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'


const firebaseConfig = {
  apiKey: "AIzaSyBCgbnMgcKEX64l38LT17gz-bMb6xxlWzY",
  authDomain: "tabledino-3a498.firebaseapp.com",
  databaseURL: "https://tabledino-3a498-default-rtdb.firebaseio.com",
  projectId: "tabledino-3a498",
  storageBucket: "tabledino-3a498.appspot.com",
  messagingSenderId: "123119785272",
  appId: "1:123119785272:web:8a39b37d8e39feab275dcd"
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp( firebaseConfig ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
