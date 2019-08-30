import { NgModule } from '@angular/core';
import {
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatSelectModule,
  MatOptionModule,
  MatNativeDateModule,
  MatCardModule,
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCardModule,
    DragDropModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCardModule,
    DragDropModule,
  ],
})
export class MaterialModule { }
