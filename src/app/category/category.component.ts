import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  myForm!: FormGroup;
  cars:any;
  trees:any;

  constructor(private formBuilder: FormBuilder, private router: Router,private http:HttpClient) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      choice: ['']
    });
  }

  getCars() {
    this.http.get<any[]>('http://localhost:3000/car').subscribe((cars) => {
      console.log(cars);
   this.cars = cars;
    });
  }


  getTrees() {
    this.http.get<any[]>('http://localhost:3000/tree').subscribe((trees) => {
      console.log(trees);
   this.trees = trees;
    });
  }

  onSubmit() {
    const choice = this.myForm.value.choice;
    if (choice === 'car') {
      this.getCars();
    } else if (choice === 'tree') {
      this.getTrees();
    }
  }


}
