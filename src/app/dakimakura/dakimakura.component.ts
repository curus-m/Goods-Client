import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';
import Tabulator from 'tabulator-tables';
import { Goods } from '../item/Goods';
import { Dakimakura } from '../item/Dakimakura';

@Component({
  selector: 'app-dakimakura',
  templateUrl: './dakimakura.component.html',
  styleUrls: ['./dakimakura.component.scss']
})
export class DakimakuraComponent implements OnInit, OnChanges {

  indicator : string = Consts.Goods.Dakimakura;
  dakiData = [];
  addItem : string = "";
  showItem : string = "";
  tab = document.createElement('div');
  table = null;
  selectedGoods = null;
  imageURL = "http://localhost:8080/resources/dakimakura/";
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
      columns: [
        {title:"캐릭터", field:"title", sorter:"string", width:100,  align:"center", editor:"textarea"},
        {title:"제작", field:"brand", sorter:"string", align:"center",editor:"textarea"},
        {title:"가격", field:"price", sorter:"string", align:"center",editor:"number", editorParams:{
          min:0,
          max:1000000,
          step:10,
          }
        },
        {title:"발매일", field:"releaseDate",  sorter:"date", align:"center"},
        {title:"재질", field:"material", sorter:"number", align:"center", width: 150, formatter: function(cell, formatterParams,  onRendered){
          let materialNum = cell.getValue();
          let materials = Consts.Material;
          materials.find((item) => item.no == materialNum);
          return materials.find((item) => item.no == materialNum).value;
        }},
        {title: "이미지", field: "image", width: 80, align:"center" ,cellClick:function(e,cell){

          }, formatter: function(cell, formatterParams, onRendered){
            let link = cell.getData();
            let view= '[View]'
            let button = `<a href="${self.imageURL}${link.image}">${view}</a>`;
            return button;
        }},
        {title: "삭제" , formatter:"buttonCross", width:80, align:"center", cellClick:function(e, cell) {
          if(confirm('are you sure?')) {
            self.deleteDakimakura(cell.getData().no);
            self.selectedGoods = null; 
          }
        }},
      ],
      layout: 'fitColumns',
      height: '400px',
      rowClick: function (e, selectedRow) {
        let selectedGoods = selectedRow.getData();
        self.selectedGoods = selectedGoods;
        self.showItem = self.indicator;
      },
      cellEdited:function(cell){
        let row = cell.getRow().getData();;
        self.editDakimakura(row);
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
    if(!this.addItem) {
      this.addItem = this.indicator;
    }
    else {
      this.addItem = "";
    }
  }
  editDakimakura(dakimakura : Dakimakura) : void {
    console.log(`item info: ${dakimakura}`);
  }
  deleteDakimakura(no : number) {
    this.service.deleteItem(this.indicator, no).subscribe((res)=>{
      this.getDakimakura();
    }, (err) => {
      this.dakiData = err;
    });
  }

}
