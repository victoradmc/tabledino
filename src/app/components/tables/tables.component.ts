import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/models/table.models';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  //config
  displayNewTableDialog: boolean = false;
  displayStatusDialog: boolean = false;
  isLoading = false;
  isLoadingNewTable = false;
  screenWidth = 0;

  //data
  tables: Table[] = [];
  newTable: Table;
  editStatusTable: Table;
  noTables: boolean = false;


  constructor( private tableService: TableService, private messageService: MessageService ) {

  }

  ngOnInit() {
    this.newTable = new Table( null, null, 'Free', null );
    this.editStatusTable = new Table( null, null, 'Free', null );

    this.loadTables();

    this.screenWidth = window.innerWidth;

    setInterval( () => this.loadTables(), 60000 );
  }

  loadTables(): void {
    this.noTables ? this.isLoading = true : null;
    this.tableService.getTables().subscribe({
      next: ( response ) => {
        if ( response == null ) {
          this.noTables = true;
          this.isLoading = false;
        } else {
          //transform the firebase object into an array of objects
          this.tables = Object.entries( response ).map(e => 
            Object.assign( e[1] )
          );
          //get the proper ID and assign as a table ID
          this.tables.map( table => {
            Object.entries( response ).map(e => 
              table.Number == e[1].Number ? table.Id = e[0] : null
            );
          });
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

    if( !this.displayNewTableDialog ) {
      this.newTable.Number = null;
      this.newTable.Capacity = null;
      this.newTable.Status = null;
    }
  }

  toggleStatusDialog( focusedTable?: Table ): void {
    this.displayStatusDialog = !this.displayStatusDialog;

    if ( this.displayStatusDialog ) {
      this.editStatusTable = new Table( focusedTable.Number, focusedTable.Capacity, focusedTable.Status, focusedTable.Id );
    } else {
      this.editStatusTable = new Table( null, null, 'Free', null );
    }

  }
  
  handleNewTable(): void {
    this.tableService.addNewTable( this.newTable ).subscribe({
      next: ( response ) => {
        this.loadTables();
        this.toggleNewTableDialog();
      }
    });
  }

  saveStatusTable() {
    this.tableService.updateTable( this.editStatusTable, this.editStatusTable.Id ).subscribe({
      next: ( response ) => {
        this.toggleStatusDialog();
        this.loadTables();
      },
      error: ( error ) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      }
    })
  }

}
