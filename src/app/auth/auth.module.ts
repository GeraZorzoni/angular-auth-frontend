import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
