import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';
import { ItemInfoComponent } from '../item-info/item-info.component';
import Tabulator from 'tabulator-tables';
import { Goods } from '../item/Goods';
import { Eroge } from '../item/Eroge';
@Component({
  providers:[ ItemInfoComponent ],
  selector: 'app-eroge',
  templateUrl: './eroge.component.html',
  styleUrls: ['./eroge.component.scss']
})
export class ErogeComponent implements OnInit, OnChanges {
  indicator = Consts.Goods.Eroge;
  action = "";
  erogeData = [];
  tab = document.createElement('div');
  table = null;
  selectedItem : Eroge = new Eroge();
  columns = [
    {title:"Gid", field:"gid", align:"center", width:100,},
    {title:"Title", field:"title", sorter:"string", width:200,  align:"center"},
    {title:"Brand", field:"brand", sorter:"string", align:"center"},
    {title:"Price", field:"price", sorter:"string", align:"center"},
    {title:"Release Date", field:"releaseDate", sorter:"date", align:"center"}
  ];
  // @ViewChild(ItemInfoComponent) itemInfo :  QueryList<ItemInfoComponent>;

  constructor(private service : GoodsService) { }
  
  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
   
  }  
  ngOnInit() {
    this.getEroge();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.drawTable();
  }
  drawTable(): void {
    this.table = new Tabulator(this.tab, {
      data: this.erogeData,
      reactiveData:true, //enable data reactivity
      columns: this.columns,
      layout: 'fitColumns',
      height: '400px',
      rowClick: this.showItemInfo
    });
    document.getElementById('erogeTable').appendChild(this.tab);
  }  
  processItemResult($event): void {
    if($event.result == 1) {
      console.log('job successed');
      this.getEroge();
    }
  }
  getEroge() {
    this.service.getItem(this.indicator).subscribe((res)=>{
      this.erogeData = res;
      this.drawTable();
    },
    (err) => {
      this.erogeData = err;
    })
  }
  addEroge() {
    this.action = Consts.Action.add;
  }
  showItemInfo(e, selectedRow) : void {
    console.log(`row info: ${selectedRow}`);
    this.selectedItem = selectedRow.getData();
    // _row.data;
  }
}