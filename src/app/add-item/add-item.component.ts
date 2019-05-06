import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Goods } from '../item/Goods';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  @Input() indicator : string = '';
  @Output() itemInfoEvent: EventEmitter<Object> = new EventEmitter<Object>();
  eroge = Consts.Goods.Eroge;
  dakimakura = Consts.Goods.Dakimakura;
  materials = Consts.Material;
  // materials.find((item) => item.no == materialNum);
  item = new Goods();
  constructor(private service : GoodsService) { }
  
  ngOnInit() {
    
  }
  get title() :string {
    switch(this.indicator) {
      case Consts.Goods.Eroge:
        return '타이틀';
      case Consts.Goods.Dakimakura:
        return '캐릭터';
    }
  }
  get brand() : string {
    switch(this.indicator) {
      case Consts.Goods.Eroge:
        return '브랜드';
      case Consts.Goods.Dakimakura:
        return '제작사/서클';
    }
  }
  addItem(): void {
    this.item.releaseDate = new Date(this.service.dateMaker(this.item.releaseDate));
    console.log(this.item);
    if(confirm('are you sure?'))
    {
        this.service.addItem(this.indicator,this.item).subscribe((res) => {
        // console.log(`result: ${res}`);
        this.itemInfoEvent.emit(res);
      }, (err) => {

      });
    }
    else {
      this.itemInfoEvent.emit(this.item);
    }
  }
  

}
