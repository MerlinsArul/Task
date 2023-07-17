import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.css']
})
export class SharedFormComponent {
@Output() formSubmit = new EventEmitter<any>();

form:FormGroup;
constructor(private fb:FormBuilder){
  this.form = this.fb.group({
    name:['',Validators.required],
    image:['',Validators.required]
  })
}
submitForm() {
  if (this.form.valid) {
    this.formSubmit.emit(this.form.value);
    this.form.reset();
  }
}
}
