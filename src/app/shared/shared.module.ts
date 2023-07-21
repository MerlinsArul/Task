import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormComponent } from './shared-form/shared-form.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SharedFormComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule

  ],
  exports:[SharedFormComponent]
})
export class SharedModule { }
