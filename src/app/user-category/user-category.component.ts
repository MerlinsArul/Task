import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicField } from '../shared/shared-form/dynamic-field.model';
import { SharedFormComponent } from '../shared/shared-form/shared-form.component';
import { AddcategoryComponent } from '../addcategory/addcategory.component';


@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
  styleUrls: ['./user-category.component.css']
})
export class UserCategoryComponent {
  treefields!: DynamicField[];
carfields!:DynamicField[];
  @ViewChild(SharedFormComponent) sharedForm!: SharedFormComponent;


  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private addcategory:AddcategoryComponent){
    // Get the form fields from the AddFieldComponent
    this.treefields = this.addcategory.getFormFields();
    this.carfields = this.addcategory.getcarFormFields();
  }

  onSubmit(formData: any) {
    console.log(formData);
    this.http.post<any>('http://localhost:3000/car', formData).subscribe(
      (response) => {
        this.toastr.success('Data Added Successfully');
      },
      (error) => {
        this.toastr.error('Try Again');
        console.error('Error adding data:', error);
      }
    );
  }

  onSubmit1(formData: any) {
    console.log(formData);

    this.http.post<any>('http://localhost:3000/tree', formData).subscribe(
      (response) => {
        this.toastr.success('Tree Added Successfully');
        console.log('Tree added:', response);
      },
      (error) => {
        this.toastr.error('Try Again');
        console.error('Error adding cat:', error);
      }
    );
  }

}
