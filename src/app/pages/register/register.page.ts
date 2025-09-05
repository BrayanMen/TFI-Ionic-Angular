import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SupabaseService } from 'src/services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', Validators.email),
        password: new FormControl('', Validators.minLength(5)),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        validators: this.passwordMatch,
      }
    );
  }

  ngOnInit() {}

  passwordMatch(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  async registerUser(){
     if (this.registerForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message:'Debes llenar todos los campos',
        buttons:['Aceptar']
      })
      await alert.present()
      return
    }
    const { email, password } = this.registerForm.value;

    const { data, error } = await this.supabase.register(email, password);
    
    if (error) {
      console.log('Error: ', error.message);
    } else {
      console.log('Usuario registrado: ', data.user);
      localStorage.setItem('supabase_session', JSON.stringify(data.session))
      this.router.navigate(['/welcome']);
    }
  }
}
