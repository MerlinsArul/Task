import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { DynamicField } from '../shared/shared-form/dynamic-field.model';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent {
  @Output() addFieldEvent = new EventEmitter<DynamicField>();
  constructor(private http: HttpClient) {}

  newField: DynamicField = {
    type: 'text',
    label: '',
    name: '',
  };

  addField() {
    if (this.newField.label && this.newField.name) {
      this.addFieldEvent.emit({ ...this.newField }); // Emit the new field object
      this.newField = { type: 'text', label: '', name: '' }; // Reset the newField object
    }
  }

}
