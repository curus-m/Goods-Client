import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-test',
  templateUrl: './upload-test.component.html',
  styleUrls: ['./upload-test.component.scss']
})
export class UploadTestComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  SERVER_URL = "http://localhost:8080/upload/eroge";
  uploadForm: FormGroup;  
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
