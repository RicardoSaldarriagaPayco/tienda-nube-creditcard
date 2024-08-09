// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_API_URL: string;
      readonly REACT_APP_APP_TITLE: string;
      // Agrega más variables según sea necesario
    }
  }
  