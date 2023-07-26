import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddFieldComponent } from '../add-field/add-field.component';
import { LocalStorageService } from '../localstorage.service';
import { DynamicField } from '../shared/shared-form/dynamic-field.model';
import { SharedFormComponent } from '../shared/shared-form/shared-form.component';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
})
export class AddcategoryComponent implements OnInit {
  @ViewChild('sharedForm', { static: false }) sharedForm!: SharedFormComponent;
  @ViewChild(AddFieldComponent, { static: false }) addFieldComponent!: AddFieldComponent;

  cars!: any[];
  newCarField!: DynamicField;

  constructor(private http: HttpClient, private toastr: ToastrService,private localStorageService: LocalStorageService) {}

  treefields: DynamicField[] = [
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
  carfields: DynamicField[] = [
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
      label: 'Color',
      name: 'color',
      value: '',
      options: [
        { value: 'Red', label: 'Red' },
        { value: 'Blue', label: 'Blue' },
        { value: 'Green', label: 'Green' },
        { value: 'Yellow', label: 'Yellow' },
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
      name: 'wheel',
      label: 'Wheel',
      type: 'radio',
      options: [
        { value: 'Car', label: 'Fourwheel' },
        { value: 'Lorry', label: 'EightWheel' },
      ],
      validators: {
        required: true,
      },
    },
  ];

  ngOnInit() {
    const storedTreeFields = this.localStorageService.getFields('treefields');
    if (storedTreeFields && storedTreeFields.length > 0) {
      this.treefields = storedTreeFields;
    }

    const storedCarFields = this.localStorageService.getFields('carfields');
    if (storedCarFields && storedCarFields.length > 0) {
      this.carfields = storedCarFields;
    }
  }

  getFormFields(): DynamicField[] {
    console.log(this.treefields);

    return this.treefields;
  }

  getcarFormFields(){
    console.log(this.carfields);
    return this.carfields;
  }

  onAddField(newField: DynamicField) {
    this.treefields.push(newField);
    const a = this.localStorageService.setFields('treefields', this.treefields);
  }

  onAddField1(newField: DynamicField) {
    this.newCarField = newField;
    this.carfields.push(newField);
    const b =this.localStorageService.setFields('carfields', this.carfields);
  }
}
