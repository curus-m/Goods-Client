import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';
import Tabulator from 'tabulator-tables';

@Component({
  selector: 'app-dakimakura',
  templateUrl: './dakimakura.component.html',
  styleUrls: ['./dakimakura.component.scss']
})
export class DakimakuraComponent implements OnInit, OnChanges {

  indicator : string = Consts.Goods.Dakimakura;
  dakiData = [];
  addItem : string = "";
  tab = document.createElement('div');
  table = null;
  selectedGoods = null;
  columns = [
    {title:"캐릭터", field:"title", sorter:"string", width:200,  align:"center"},
    {title:"제작", field:"brand", sorter:"string", align:"center"},
    {title:"가격", field:"price", sorter:"string", align:"center"},
    {title:"발매일", field:"releaseDate", sorter:"date", align:"center"},
    {title:"재질", field:"material", sorter:"number", align:"center"}
  ];
  
  constructor(private service : GoodsService) { }

  ngOnInit() {
    this.getDakimakura();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.drawTable();  
  }
  drawTable(): void {
    var self = this;
    this.table = new Tabulator(this.tab, {
      data: this.dakiData,
      reactiveData:true, //enable data reactivity
      columns: this.columns,
      layout: 'fitColumns',
      height: '400px',
      rowClick: function (e, selectedRow) {
        let selectedGoods = selectedRow.getData();
        self.selectedGoods = selectedGoods;
      }
    });
    document.getElementById('dakiTable').appendChild(this.tab);
  }  
  processItemResult($event): void {
    if($event.result == 1) {
      console.log('job successed');
      this.getDakimakura();
    }
  }
  getDakimakura() : void {
    this.service.getItem(this.indicator).subscribe((res)=>{
      this.dakiData = res;
      this.drawTable();
    },
    (err) => {
      this.dakiData = err;
    })
  }
  addDakimakura() : void {
    this.addItem = this.indicator;
  }

}
