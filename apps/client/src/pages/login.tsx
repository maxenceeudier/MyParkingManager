import { LoginForm } from "../components/LoginForm";
import "../styles/login.scss";

export default function Login(): JSX.Element {
  return (
    <div className="containerLogin">
     <LoginForm />
    </div>
  );
}
