import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Goods } from '../item/Goods';
import { GoodsService } from '../services/goods.service';
import { Consts } from '../services/consts';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  constructor(private service : GoodsService, private formBuilder: FormBuilder ) { }
  uploadForm : FormGroup
  ngOnInit() {
    
    this.uploadForm= this.formBuilder.group({
      file: ['']
    });
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
  get file() : string {
    switch(this.indicator) {
      case Consts.Goods.Eroge:
        return '패키지';
      case Consts.Goods.Dakimakura:
      case Consts.Goods.Tapestry:
        return '이미지';
    }
  }
  addItem(): void {
    this.item.releaseDate = this.service.dateMaker(this.item.releaseDate);
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('eroge', this.item.toString());
    // console.log(this.item);
    if(confirm('are you sure?'))
    {
        // this.service.addItem(this.indicator,this.item).subscribe((res) => {
          this.service.addItem(this.indicator,formData).subscribe((res) => {
        // console.log(`result: ${res}`);
        this.itemInfoEvent.emit(res);
      }, (err) => {

      });
    }
    else {
      this.itemInfoEvent.emit("job canceled");
    }
  }
  
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }
  
}
