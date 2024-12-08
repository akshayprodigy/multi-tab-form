import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="form-container">
      <mat-tab-group [(selectedIndex)]="selectedTabIndex">
        <!-- Personal Info Tab -->
        <mat-tab label="Personal Info">
          <form [formGroup]="personalInfoForm" class="form-content">
          <mat-form-field appearance="fill">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="fullName" />
            <mat-error *ngIf="personalInfoForm.get('fullName')?.hasError('required')">
              Full Name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender">
              <mat-option value="male">Male</mat-option>
              <mat-option value="female">Female</mat-option>
              <mat-option value="other">Other</mat-option>
            </mat-select>
            <mat-error *ngIf="personalInfoForm.get('gender')?.hasError('required')">
              Gender is required
            </mat-error>
          </mat-form-field>
          </form>
        </mat-tab>

        <!-- Contact Info Tab -->
        <mat-tab label="Contact Info">
          <form [formGroup]="contactInfoForm" class="form-content">
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" />
              <mat-error *ngIf="contactInfoForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="contactInfoForm.get('email')?.hasError('email')">
                Invalid email address
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" />
              <mat-error *ngIf="contactInfoForm.get('phone')?.hasError('required')">
                Phone number is required
              </mat-error>
            </mat-form-field>
          </form>
        </mat-tab>

        <!-- Qualification Tab -->
        <mat-tab label="Qualification">
          <form [formGroup]="qualificationForm" class="form-content">
            <mat-form-field appearance="fill">
              <mat-label>Highest Qualification</mat-label>
              <input matInput formControlName="qualification" />
              <mat-error *ngIf="qualificationForm.get('qualification')?.hasError('required')">
                Qualification is required
              </mat-error>
            </mat-form-field>
          </form>
        </mat-tab>

        <!-- Uploads Tab -->
        <mat-tab label="Uploads">
          <form [formGroup]="uploadsForm" class="form-content">
            <label for="resume-upload" class="file-upload-label">Upload Resume</label>
            <input
              id="resume-upload"
              type="file"
              formControlName="resume"
              (change)="onFileSelect($event)"
              class="file-input"
            />
            <div *ngIf="uploadsForm.get('resume')?.hasError('required')">
              <mat-error>Resume is required</mat-error>
            </div>
          </form>
        </mat-tab>
      </mat-tab-group>

      <div class="button-container">
        <button
          mat-raised-button
          color="primary"
          [disabled]="!canMoveToNextTab()"
          (click)="goToNextTab()"
        >
          Next
        </button>

        <button
          mat-raised-button
          color="accent"
          [disabled]="!canSubmitForm()"
          (click)="submitForm()"
        >
          Submit
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedTabIndex = 0;

  personalInfoForm: FormGroup;
  contactInfoForm: FormGroup;
  qualificationForm: FormGroup;
  uploadsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.contactInfoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.qualificationForm = this.fb.group({
      qualification: ['', Validators.required],
    });

    this.uploadsForm = this.fb.group({
      resume: ['', Validators.required],
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected File:', file);
      this.uploadsForm.patchValue({ resume: file });
    }
  }

  canMoveToNextTab(): boolean {
    switch (this.selectedTabIndex) {
      case 0:
        return this.personalInfoForm.valid;
      case 1:
        return this.contactInfoForm.valid;
      case 2:
        return this.qualificationForm.valid;
      case 3:
        return this.uploadsForm.valid;
      default:
        return false;
    }
  }

  goToNextTab(): void {
    if (this.canMoveToNextTab() && this.selectedTabIndex < 3) {
      this.selectedTabIndex++;
    }
  }

  canSubmitForm(): boolean {
    return (
      this.personalInfoForm.valid &&
      this.contactInfoForm.valid &&
      this.qualificationForm.valid &&
      this.uploadsForm.valid
    );
  }

  submitForm(): void {
    if (this.canSubmitForm()) {
      const formData = {
        personalInfo: this.personalInfoForm.value,
        contactInfo: this.contactInfoForm.value,
        qualification: this.qualificationForm.value,
        uploads: this.uploadsForm.value,
      };
      console.log('Form Submitted', formData);
      alert('Form successfully submitted!');
    }
  }
}
