import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.pruebaapp',
  appName: 'prueba-app',
  webDir: 'www',
  android: {
    backgroundColor: '#ffffff',
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '241270107193-d9sflauift54nukc8lcl36q18ssak281.apps.googleusercontent.com',
    },
    SplashScreen: {
      launchAutoHide: false,          // se oculta solo
      // launchShowDuration: 3000,       // 3 segundos
      // backgroundColor: "#ffffffff",  // color fondo
      // androidScaleType: "CENTER_CROP",
      // showSpinner: true,
      // androidSpinnerStyle: "large",
      // spinnerColor: "#999999"
    },
  },
};

export default config;
