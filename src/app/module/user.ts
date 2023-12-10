export interface User {
  accesToken: string;
  user: {
    email: string;
    password: string;
    name: string;
    id: number;
  };
}
