import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { Button } from 'protractor';


@Component({
  selector: 'app-tabulator-table',
  templateUrl: './tabulator-table.component.html',
  styleUrls: ['./tabulator-table.component.scss']
})
export class TabulatorTableComponent implements OnChanges {

  @Input() indicator : string = "";
  @Input() tableData: any[] = [];
  @Input() columnNames: any[] = [];
  @Input() height: string = '311px';
  // list properties you want to set per implementation here...

  tab = document.createElement('div');
  table = null;
  
  ngOnChanges(changes: SimpleChanges): void {
    this.drawTable();
  }

  private drawTable(): void {
    this.table = new Tabulator(this.tab, {
      data: this.tableData,
      reactiveData:true, //enable data reactivity
      columns: this.columnNames,
      layout: 'fitData',
      height: this.height
    });
    document.getElementById('my-tabular-table').appendChild(this.tab);
  }

  confirmItem() : void {
    console.log('item updated');
  }
  constructor() { }

  ngOnInit() {
  }

}
