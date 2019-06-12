import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Goods } from '../item/Goods';
import { Consts } from '../services/consts';
import { GoodsService } from '../services/goods.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  
  @Input() indicator : string;
  @Input() isEdit : string;
  @Input() itemNo: number;
  @Input() goods : Goods;
  @Output() itemInfoEvent: EventEmitter<Object> = new EventEmitter<Object>();
  uploadForm : FormGroup;
  errorMsg : string;

  constructor(private service : GoodsService, private formBuilder: FormBuilder ) { }
  ngOnInit() {
    this.uploadForm= this.formBuilder.group({
      file: ['']
    });
  }

  get brand() : string {
    switch(this.indicator) {
      case Consts.Goods.Eroge:
        return '브랜드';
      case Consts.Goods.Dakimakura:
        return '제작사/서클';
    }
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }
  setImage(): void {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    formData.append('no', JSON.stringify(this.itemNo));
    // console.log(this.item);
    if(confirm('are you sure?'))
    {
        this.service.setImage(this.indicator,formData).subscribe((res) => {
        this.itemInfoEvent.emit(res);
      }, (err) => {
        this.errorMsg = err;
      });
    }
    else {
      this.itemInfoEvent.emit("job canceled");
    }
  }

}
