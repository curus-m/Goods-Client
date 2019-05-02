import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';
import { ItemInfoComponent } from '../item-info/item-info.component';


@Component({
  providers:[ItemInfoComponent],
  selector: 'app-eroge',
  templateUrl: './eroge.component.html',
  styleUrls: ['./eroge.component.scss']
})
export class ErogeComponent implements OnInit {
  indicator = Consts.Goods.Eroge;
  action = "";
  erogeData = [];
 
  columns = [
    {title:"Gid", field:"gid", align:"center", width:100, editor: "input", validator:"unique"},
    {title:"Title", field:"title", sorter:"string", width:200, editor: "input", validator:"required"},
    {title:"Brand", field:"brand", sorter:"string", align:"center", editor: "input", validator:"required"},
    {title:"Price", field:"price", sorter:"string", editor: "input", validator:"required"},
    {title:"Release Date", field:"releaseDate", sorter:"date", align:"center", editor: "input", validator:"required"}
];
  
  constructor(private service : GoodsService, private itemInfo : ItemInfoComponent) { }
  
  ngOnInit() {
    this.getEroge();
 
  }
  processResult($event): void {
    if($event.result == 1) {
      console.log('job successed');
      this.getEroge();
    }
  }
  getEroge() {
    this.service.getItem(this.indicator).subscribe((res)=>{
      this.erogeData = res;
    },
    (err) => {
      this.erogeData = err;
    })
  }
  addEroge() {
    this.action = Consts.Action.add;
  }
}
