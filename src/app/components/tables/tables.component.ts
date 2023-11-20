import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/models/table.models';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  //config
  displayNewTableDialog: boolean = false;
  isLoading = false;
  isLoadingNewTable = false;

  //data
  tables: Table[] = [];
  newTable: Table;
  noTables: boolean = false;

  constructor( private tableService: TableService) {

  }

  ngOnInit() {
    this.newTable = new Table( null, null, 'Free' );

    this.loadTables();
  }

  loadTables(): void {
    this.isLoading = true;
    this.tableService.getTables().subscribe({
      next: ( response ) => {
        if ( response == null ) {
          this.noTables = true;
          this.isLoading = false;
        } else {
          console.log( response );
          this.tables = Object.entries( response ).map(e => 
            Object.assign( e[1] )
          );
          this.noTables = false;
          this.isLoading = false;
        }
      },
      error: ( error ) => {
        console.log( error );
      }
    })
  }

  toggleNewTableDialog(): void {
    this.displayNewTableDialog = !this.displayNewTableDialog;
  }
  
  handleNewTable(): void {
    this.tableService.addNewTable( this.newTable ).subscribe({
      next: ( response ) => {
        this.loadTables();
        this.toggleNewTableDialog();
      }
    })
  }

}
