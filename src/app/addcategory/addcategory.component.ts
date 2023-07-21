import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicField } from '../shared/shared-form/dynamic-field.model';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
})
export class AddcategoryComponent {
  cars!: any[];

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  fields: DynamicField[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      value: '',
      validators: {
        required: true,
        minLength: 6,
      },
    },
    {
      type: 'text',
      label: 'Image',
      name: 'image',
      value: '',
      validators: {
        required: true,
        regexPattern: '^(https?://).*$',
      },
    },
    {
      type: 'select',
      label: 'Remarks',
      name: 'remarks',
      value: '',
      options: [
        { value: 'Simple', label: 'default' },
        { value: '5 star ratings', label: 'Excellent' },
        { value: '4 star ratings', label: 'Very Good' },
        { value: '3 star ratings', label: 'Good' },
      ],
      validators: {
        required: true,
      },
    },
    {
      name: 'country',
      label: 'Country',
      type: 'checkbox',
      options: [
        { value: 'USA', label: 'United States' },
        { value: 'Canada', label: 'Canada' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'Germany', label: 'Germany' },
      ],
      validators: {
        required: true,
      },
    },
    {
      name: 'type',
      label: 'Thing',
      type: 'radio',
      options: [
        { value: 'Living', label: 'Living' },
        { value: 'Nonliving', label: 'Nonliving' },
      ],
      validators: {
        required: true,
      },
    },
  ];

  onSubmit(formData: any) {
    console.log(formData);
    this.http.post<any>('http://localhost:3000/car', formData).subscribe(
      (response) => {
        this.toastr.success('Car Added Successfully');
      },
      (error) => {
        this.toastr.error('Try Again');
        console.error('Error adding cat:', error);
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
