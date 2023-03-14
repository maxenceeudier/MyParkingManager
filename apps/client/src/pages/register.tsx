import { RegisterForm } from "../components/RegisterForm";
import "../styles/login.scss";


export default function Register(): JSX.Element {
  return (
    <div className="containerLogin">
      <RegisterForm />
    </div>
  );
}