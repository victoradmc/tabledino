export class Table {
    constructor(
      public Number: number,
      public Capacity: number,
      public Status: string,
      public Id?: string,
    ) {}

    changeStatus( newStatus: string ): void {
        this.Status = newStatus;
    }
    
}