import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
})
export class AddcategoryComponent {
  cars!: any[];

  constructor(private http: HttpClient,private toastr:ToastrService) {}

  onSubmit(formData: any) {
    console.log(formData);
    this.http.post<any>('http://localhost:3000/car', formData).subscribe(
      (response) => {
      this.toastr.success('Car Added Successfully')
      },
      (error) => {
        this.toastr.error('Try Again')
        console.error('Error adding cat:', error);
      }
    );
  }

  onSubmit1(formData: any) {
    console.log(formData);

    this.http.post<any>('http://localhost:3000/tree', formData).subscribe(
      (response) => {
        this.toastr.success('Tree Added Successfully')
        console.log('Tree added:', response);
      },
      (error) => {
        this.toastr.error('Try Again')
        console.error('Error adding cat:', error);
      }
    );
  }
}
