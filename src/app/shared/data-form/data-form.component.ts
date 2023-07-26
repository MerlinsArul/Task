import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent {
  @Input() radioOptions!: string[];
  @Input() checkboxOptions!: string[];
  @Input() selectedOptions: any[] = [];
  @Output() selectedOptionsChange: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      selectedRadioOption: [''],
      selectedCheckboxOptions: [[]],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.emitSelectedOptions();
    });
  }

  emitSelectedOptions() {
    const options = {
      selectedRadioOption: this.form.value.selectedRadioOption,
      selectedCheckboxOptions: this.form.value.selectedCheckboxOptions,
    };
    this.selectedOptionsChange.emit(options);
  }

  isSelectedRadio(option: string): boolean {
    return this.form.value.selectedRadioOption === option;
  }

  updateSelectedRadio(option: string) {
    this.form.controls['selectedRadioOption'].setValue(option);
    this.emitSelectedOptions();
  }

  isSelectedCheckbox(option: string): boolean {
    return this.form.value.selectedCheckboxOptions.includes(option);
  }

  updateCheckboxOptions(option: string, event: Event) {
    console.log('Option:', option);
    const isChecked = (event.target as HTMLInputElement).checked;
    const selectedCheckboxOptions =
      this.form.controls['selectedCheckboxOptions'].value;

    if (isChecked) {
      selectedCheckboxOptions.push(option);
    } else {
      const index = selectedCheckboxOptions.indexOf(option);
      if (index !== -1) {
        selectedCheckboxOptions.splice(index, 1);
      }
    }
    this.form.controls['selectedCheckboxOptions'].setValue(
      selectedCheckboxOptions
    );
    this.emitSelectedOptions();
  }
}
