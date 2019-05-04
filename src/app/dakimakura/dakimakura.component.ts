import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';

@Component({
  selector: 'app-dakimakura',
  templateUrl: './dakimakura.component.html',
  styleUrls: ['./dakimakura.component.scss']
})
export class DakimakuraComponent implements OnInit {

  indicator : string = Consts.Goods.Dakimakura;
  dakiData = [];
  constructor(private service : GoodsService) { }

  ngOnInit() {
    this.getDakimakura();
  }
  getDakimakura() : void {
    this.service.getItem(this.indicator).subscribe((res)=>{
      this.dakiData = res;
    },
    (err) => {
      this.dakiData = err;
    })
  }

}
