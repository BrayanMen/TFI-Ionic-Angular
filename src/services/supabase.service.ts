import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabaseConn: SupabaseClient;
  public user: any = null;
  constructor(private router: Router) {
    this.supabaseConn = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
        },
      }
    );
  }

  async login(email: string, password: string) {
    return await this.supabaseConn.auth.signInWithPassword({ email, password });
  }

  async loginwithGoogle() {
    return await this.supabaseConn.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:8100/welcome',
      },
    });
  }

  async loginWithDiscord() {
    return await this.supabaseConn.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: 'http://localhost:8100/welcome',
      },
    });
  }

  async register(email: string, password: string) {
    return await this.supabaseConn.auth.signUp({ email, password });
  }
  async logout() {
    await this.supabaseConn.auth.signOut();
    this.user = null;
    this.router.navigate(['/login']);
  }

  getClient() {
    return this.supabaseConn;
  }
  
  setSession(session: any) {
    this.user = session.user;
    this.supabaseConn.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  async getCurrentSession() {
    const { data, error } = await this.supabaseConn.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async getCurrentUser() {
    const { data, error } = await this.supabaseConn.auth.getUser();
    if (error) throw error;
    return data.user;
  }
}
