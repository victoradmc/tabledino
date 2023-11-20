import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor( private http: HttpClient ) { }

  tables = [
    { tableNumber: 1, forHowMany: 4 },
    { tableNumber: 2, forHowMany: 4},
    { tableNumber: 3, forHowMany: 6 },
    { tableNumber: 4, forHowMany: 8}
  ]

  storeTables() {
    return this.http.put(
      'https://tabledino-3a498-default-rtdb.firebaseio.com/tables.json',
      this.tables
    )
  }

  getTables() {
    return this.http.get('https://tabledino-3a498-default-rtdb.firebaseio.com/tables.json');
  }

  addNewTable( table ) {
    return this.http.post(
      'https://tabledino-3a498-default-rtdb.firebaseio.com/tables.json',
      table
    )
  }

  updateTableZero() {

    const dataToUpdate = {
      tableNumber: 1,
      forHowMany: 19
    }

    return this.http.patch(
      'https://tabledino-3a498-default-rtdb.firebaseio.com/tables/0/.json',
      dataToUpdate
    )
  }
}
