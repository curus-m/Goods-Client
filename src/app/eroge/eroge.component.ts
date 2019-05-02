import { Component, OnInit } from '@angular/core';
import { ErogeService } from './eroge.service';
import { TabulatorTableComponent } from '../tabulator-table/tabulator-table.component';
@Component({
  selector: 'app-eroge',
  templateUrl: './eroge.component.html',
  styleUrls: ['./eroge.component.scss']
})
export class ErogeComponent implements OnInit {
  erogeData = [];
  columns = [
    {title:"Id", field:"id", align:"center", width:100},
    {title:"Title", field:"title", sorter:"string", width:200 },
    {title:"Brand", field:"brand", sorter:"string", align:"center"},
    {title:"Price", field:"price", sorter:"string"},
    {title:"Release Date", field:"releaseData", sorter:"date", align:"center"}
];
  
  constructor(private service : ErogeService) { }
  
  ngOnInit() {
    this.getEroge();
 
  }
 
  getEroge() {
    this.service.getEroge().subscribe((res)=>{
      this.erogeData = res;
    },
    (err) => {
      this.erogeData = err;
    })
  }
  
}
