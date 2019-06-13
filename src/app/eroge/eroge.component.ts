import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';
import { ItemInfoComponent } from '../item-info/item-info.component';
import Tabulator from 'tabulator-tables';
import { Eroge } from '../item/Eroge';

@Component({
  providers:[ ItemInfoComponent ],
  selector: 'app-eroge',
  templateUrl: './eroge.component.html',
  styleUrls: ['./eroge.component.scss']
})
export class ErogeComponent implements OnInit, OnChanges {
  indicator = Consts.Goods.Eroge;
  addItem; showItem; action; preview : string = '';
  itemNo : number = 0;
  erogeData = [];
  tab = document.createElement('div');
  table = null;
  selectedGoods = null;
  error = '';
  imageURL = "http://localhost:8080/resources/eroge/";
  noImage = Consts.noImage;
  constructor(private service : GoodsService) { }
    
  ngOnInit() {
    this.getEroge();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.drawTable();  
  }
  drawTable(): void {
    var self = this;
    this.table = new Tabulator(this.tab, {
      data: this.erogeData,
      reactiveData:true, //enable data reactivity
      columns:[
        {title:"Gid", field:"gid", align:"center", width:100, editor:"textarea"},
        {title:"제목", field:"title", sorter:"string", width:200,  align:"center", editor:"textarea"},
        {title:"브랜드", field:"brand", sorter:"string", align:"center", editor:"textarea"},
        {title:"가격", field:"price", sorter:"string", align:"center", editor:"number"},
        {title:"발매일", field:"releaseDate", sorter:"date", align:"center"},
        {title: "이미지", field: "image", width: 80, align:"center" ,cellClick:function(e,cell){
          let link = cell.getData().image;
          let text = link == self.noImage ? Consts.Action.add : Consts.Action.edit;
          self.editImage(text);
          self.addItem = "";
          self.itemNo = cell.getData().no;
          }, formatter: function(cell, formatterParams, onRendered){
            let link = cell.getData().image;
            let text = link == self.noImage ? Consts.Action.add : Consts.Action.edit;
            return `[${text}]`;
        }},
        {title: "삭제" , formatter:"buttonCross", width:80, align:"center", cellClick:function(e, cell) {
            if(confirm('are you sure?')) {
              self.deleteEroge(cell.getData().no);
              self.selectedGoods = null;
            }
          }
        }],
      layout: 'fitColumns',
      height: '400px',
      rowClick: function (e, selectedRow) {
        let selectedGoods = selectedRow.getData();
        self.preview = self.imageURL+selectedGoods.image;
        self.selectedGoods = selectedGoods;
        self.showItem = self.indicator;
      },
      cellEdited:function(cell){
        let row = cell.getRow().getData();
        self.editEroge(row);
      }
    });
    document.getElementById('erogeTable').appendChild(this.tab);
  }  
  processItemResult($event): void {
    if($event.result == 1) {
      console.log('job successed');
      this.getEroge();
      this.showItem = '';
    }
    else {
      this.error = $event.errorMessage;
    }
  }
  getEroge() {
    this.error ="";
    this.service.getItem(this.indicator).subscribe((res)=>{
      this.erogeData = res;
      this.drawTable();
    },
    (err) => {
      this.erogeData = err;
    })
  }
  addEroge() {
    if(!this.addItem) {
      this.addItem = this.indicator;
    }
    else {
      this.addItem = "";
    }
  }
  editEroge(eroge : Eroge) {
    this.service.editItem(this.indicator, eroge).subscribe((res)=>{
      this.getEroge();
    }, (err) => {
      this.erogeData = err;
    });
  }
  deleteEroge(no: number) {
    this.service.deleteItem(this.indicator, no).subscribe((res)=>{
      this.getEroge();
    }, (err) => {
      this.erogeData = err;
    });

  }
  editImage(action : string) : void {
    this.action = action;
  }
}