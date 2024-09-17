import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      username: string;
      // Agrega otras propiedades que necesites
    };
  }
}
