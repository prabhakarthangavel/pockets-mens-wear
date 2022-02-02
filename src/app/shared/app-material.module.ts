import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {MatProgressSpinnerModule,
// MatCardModule, MatTableModule, , , MatSnackBarModule, MatDatepickerModule, 
// MatNativeDateModule, MatAutocompleteModule, MatTabsModule } from '@angular/material/icon';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    // MatCardModule,
    // MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    // MatSnackBarModule,
    // MatProgressSpinnerModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatAutocompleteModule,
    // MatTabsModule
  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    // MatCardModule,
    // MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    // MatSnackBarModule,
    // MatProgressSpinnerModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatAutocompleteModule,
    // MatTabsModule
  ]
})
export class AppMaterialModule { }
