import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';
import { ItemInfoComponent } from '../item-info/item-info.component';
import Tabulator from 'tabulator-tables';

@Component({
  providers:[ ItemInfoComponent ],
  selector: 'app-eroge',
  templateUrl: './eroge.component.html',
  styleUrls: ['./eroge.component.scss']
})
export class ErogeComponent implements OnInit, OnChanges {
  indicator = Consts.Goods.Eroge;
  addItem : string = "";
  showItem : string = "";
  erogeData = [];
  tab = document.createElement('div');
  table = null;
  selectedGoods = null;
  
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
        {title:"Gid", field:"gid", align:"center", width:100},
        {title:"제목", field:"title", sorter:"string", width:200,  align:"center"},
        {title:"브랜드", field:"brand", sorter:"string", align:"center"},
        {title:"가격", field:"price", sorter:"string", align:"center"},
        {title:"발매일", field:"releaseDate", sorter:"date", align:"center"},
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
        self.selectedGoods = selectedGoods;
        self.showItem = self.indicator;
      }
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
    this.addItem = this.indicator;
  }
  deleteEroge(no: number) {
    this.service.deleteItem(this.indicator, no).subscribe((res)=>{
      this.getEroge();
    }, (err) => {
      this.erogeData = err;
    });

  }
}