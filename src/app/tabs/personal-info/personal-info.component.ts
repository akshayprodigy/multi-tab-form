import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
  template: `
    <form [formGroup]="personalInfoForm">
      <mat-form-field appearance="fill">
        <mat-label>Full Name</mat-label>
        <input matInput formControlName="fullName" />
        <mat-error *ngIf="personalInfoForm.get('fullName')?.hasError('required')">
          Full Name is required
        </mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" [disabled]="personalInfoForm.invalid">
        Submit
      </button>
    </form>
  `,
})
export class PersonalInfoComponent {
  personalInfoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],
    });
  }
}
