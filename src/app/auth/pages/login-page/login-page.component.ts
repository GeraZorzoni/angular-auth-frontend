import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb          = inject (FormBuilder)
  private authService = inject(AuthService)
  private router      = inject ( Router )

  public myForm: FormGroup = this.fb.group({
    email: ['gera@gmail.com', [ Validators.required, Validators.email]],
    password: ['123456', [ Validators.required, Validators.minLength(6)]]

  })

  login (){

   const {email, password }= this.myForm.value
   this.authService.login(email, password)
   .subscribe({
    next: () => this.router.navigateByUrl('/dashboard'),
    error: (message) => {
      Swal.fire('Error', message, 'error')
    }
   })
  }

}