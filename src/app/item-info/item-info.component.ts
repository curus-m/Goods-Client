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

  @Input() indicator : string = '';
  @Input() action : string = '';
  @Output() serverEvent: EventEmitter<Object> = new EventEmitter<Object>();
  eroge = Consts.Goods.Eroge;
  item = new Goods();
  constructor(private service : GoodsService) { }

  ngOnInit() {
  }

  addItem(): void {
    console.log(this.item);
    this.service.addItem(this.indicator,this.item).subscribe((res) => {
      console.log(`result: ${res}`);
      this.serverEvent.emit(res);
    }, (err) => {

    });;
  }
  
}
