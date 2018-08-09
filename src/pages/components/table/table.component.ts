import { Component, Input, AfterViewInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  private tableColums: any[] = [];
  private tableData: any[] = [];
  private tableTitle: string;

  @Input()
  set dataArray(data: any[]) {
    this.tableData = data;
    // if ( data.length ) {
    //  Object.keys(data[0]).forEach((element: any, index: any) => {
    //   this.tableColums[index] = element;
    //  });
    // }
  }

  @Input()
  set tableColumn(data: any[]) {
    this.tableColums = data;
  }

  @Input()
  set title(text: string) {
    this.tableTitle = text;
  }

  constructor() {}

  ngAfterViewInit() {
    $('.table-responsive').perfectScrollbar();
  }
}
