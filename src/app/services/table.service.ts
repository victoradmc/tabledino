import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from '../models/table.models';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor( private http: HttpClient ) { }


  getTables() {
    return this.http.get('https://tabledino-3a498-default-rtdb.firebaseio.com/tables.json');
  }

  addNewTable( newTable: Table ) {
    return this.http.post(
      'https://tabledino-3a498-default-rtdb.firebaseio.com/tables.json',
      newTable
    )
  }

  updateTable( table: Table, id: string ) {

    const saveTable = new Table( table.Number, table.Capacity, table.Status );

    return this.http.patch(
      `https://tabledino-3a498-default-rtdb.firebaseio.com/tables/${ id }/.json`,
      saveTable
    )
  }
}
