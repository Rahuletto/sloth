export interface FormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  signInWithGoogle: () => void;
  toggleMode: (mode: "login" | "signup") => void;

  handleLogIn?: () => void;
  handleSignUp?: () => void;
}
