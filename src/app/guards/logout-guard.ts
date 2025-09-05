import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SupabaseService } from 'src/services/supabase.service';

export const logoutGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const sessionActive = await supabase.getCurrentSession();

  console.log('Logout Guard - Session:', sessionActive);
  if (sessionActive?.user) {
    return router.navigate(['/welcome']);
  } else {
    return true;
  }
};
