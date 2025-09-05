import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/services/supabase.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: false,
})
export class WelcomePage implements OnInit {

  constructor(private supabase: SupabaseService, private router: Router) {}

  ngOnInit() {}
  logOut() {
    return this.supabase.logout();
  }
}
