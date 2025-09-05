import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showSplash = true
  constructor() {
    this.initApp()
  }
  async initApp() {
   if(Capacitor.isNativePlatform()){
     await SplashScreen.show({
       showDuration: 3000,
       autoHide: true
     });
   }else{
    setTimeout(()=>{
      this.showSplash=false;
    },3000)
   }
  }
}
