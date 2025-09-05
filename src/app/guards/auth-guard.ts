import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from 'src/services/supabase.service';

export const authGuard: CanActivateFn = (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const sessionActive = supabase.getSession();
  console.log('Login Guard - Session:', sessionActive);

  if (sessionActive) {
    return true
  }else{
    router.navigate(['/login']);
    return false
  }
};
