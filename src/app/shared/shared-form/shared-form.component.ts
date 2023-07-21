import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DynamicField } from './dynamic-field.model';

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.css'],
})
export class SharedFormComponent {
  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('stepper') stepper!: MatStepper;
  @Input() fields: DynamicField[] = [];
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    const formGroup: any = {};

    this.fields.forEach((field) => {
      const validators: any[] = [];
      const optionValue =
        field.options && field.options.length > 0 ? field.options[0].value : '';

      if (field.validators) {
        if (field.validators.required) {
          validators.push(Validators.required);
        }
        if (field.validators.minLength) {
          validators.push(Validators.minLength(field.validators.minLength));
        }
        if (field.validators.maxLength) {
          validators.push(Validators.maxLength(field.validators.maxLength));
        }
        if (field.validators.regexPattern) {
          const regexValidator = Validators.pattern(
            field.validators.regexPattern
          );
          validators.push(regexValidator);
        }
      }

      if (field.type === 'checkbox') {
        // For checkbox type
        field.options?.forEach((option) => {
          formGroup[field.name + '_' + option.value] = new FormControl(
            field.value ? field.value.includes(option.value) : false,
            validators
          );
        });
      } else {
        // For other types
        formGroup[field.name] = new FormControl(
          field.value || optionValue,
          validators
        );
      }
    });
    this.form = this.formBuilder.group(formGroup);
  }

  isLastStep(field: DynamicField): boolean {
    return field === this.fields[this.fields.length - 1];
  }

  submitForm() {
    if (this.form.valid) {
      const formValue: any = {};
      this.fields.forEach((field) => {
        if (field.type === 'checkbox') {
          const selectedOptions = field.options
            ?.filter(
              (option) => this.form.get(field.name + '_' + option.value)?.value
            )
            .map((option) => option.value);
          formValue[field.name] = selectedOptions;
        } else {
          formValue[field.name] = this.form.get(field.name)?.value;
        }
      });

      this.formSubmit.emit(formValue);
      this.form.reset();
      this.stepper.reset();
    }
  }
}
