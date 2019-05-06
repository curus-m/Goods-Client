import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Goods } from '../item/Goods';
import { Consts } from '../services/consts';
import { GoodsService } from '../services/goods.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  
  @Input() indicator : string;
  constructor() {
    
  }

  get brand() : string {
    switch(this.indicator) {
      case Consts.Goods.Eroge:
        return '브랜드';
      case Consts.Goods.Dakimakura:
        return '제작사/서클';
    }
  }

  @Input() goods : Goods;
  ngOnInit() {
    
  }  
}
