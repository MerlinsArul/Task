import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { combineLatest, forkJoin } from 'rxjs';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  myForm!: FormGroup;
  cars: any;
  trees: any;

  radioOptions: string[] = ['car', 'tree'];
  checkboxOptions: string[] = ['car', 'tree'];
  selectedOptions: any = {
    selectedRadioOption: '',
    selectedCheckboxOptions: [],
  };
  dataFromDatabase: any[] = [];

  constructor(private http: HttpClient,private authService:AuthService,private toastr:ToastrService) {}

  onSelectedOptionsChange(options: any) {
    this.selectedOptions = options;
    this.fetchDataFromDatabase();
  }
  fetchDataFromDatabase() {
    const selectedCheckboxOptions =
      this.selectedOptions.selectedCheckboxOptions;
    const selectedRadioOption = this.selectedOptions.selectedRadioOption;

    const fetchRequests: any[] = [];

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
    for (const option of selectedCheckboxOptions) {
      const apiUrl = this.getApiUrl(option);
      fetchRequests.push(this.http.get<any[]>(apiUrl, { headers }));
    }

    if (selectedRadioOption) {
      const radioApiUrl = this.getApiUrl(selectedRadioOption);
      fetchRequests.push(this.http.get<any[]>(radioApiUrl, { headers }));
    }

    combineLatest(fetchRequests).subscribe((results: any) => {
      const fetchedData: any[] = [];

      for (const data of results) {
        fetchedData.push(...data);
      }

      this.dataFromDatabase = fetchedData;
    });
  }



  getApiUrl(option: string): string {
    const isLoggedIn = this.authService.isLoggedIn();
    if (option === 'car') {
      return 'http://localhost:3000/car';
    } else if (option === 'tree' && isLoggedIn) {
      return 'http://localhost:3000/tree';
    } else {
      this.toastr.warning('Kindly Login')
      return '';
    }
  }
}
