import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/services/supabase.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.formularioLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
  ngOnInit() {}

  async loginUser() {
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Tus credenciales son invalidas',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    const { email, password } = this.formularioLogin.value;
    try {
      const { data, error } = await this.supabase.login(email, password);
      const session = await this.supabase.getCurrentSession()
      this.formularioLogin.reset()
      this.supabase.setSession(session);
      this.router.navigate(['/welcome']);
    } catch (err) {
      //@ts-ignore
      console.log('Error: ', err.message);
    }
  }

  async loginGoogle(){
    try {
      await this.supabase.loginwithGoogle()      
    } catch (error) {
      console.error('Error log google: ', error); 
    }
  }
  async loginDiscord(){
    try {
      await this.supabase.loginWithDiscord()
    } catch (error) {
      console.error('Error log discord: ', error); 
    }
  }
}
