import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  tables;

  newTable = { tableNumber: null, forHowMany: null }

  constructor( private dataService: DataStorageService ) {}

  ngOnInit(){}

  

}
