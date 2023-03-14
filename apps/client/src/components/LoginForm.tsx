import { ReactElement, useState } from "react";
import { Input } from "../components/Input";
import "../styles/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../store/UserSlice";

interface LoginFormData {
  username: string;
  password: string;
}

async function login(
  data: LoginFormData
): Promise<{name: string, token: string} | null> 
{
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data } ),
  }).then(async (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.message || "An unexpected error occured...");
      });
    } else {
      return await response.text().then((data) => {
        return data ? JSON.parse(data) : {};
      });
    }
  });
  if (!response) return null;
  return response;
}

export function LoginForm(): ReactElement {
  let navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormData>();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setFormError("");
    setFormSuccess("");
    setLoading(true);

    await login(data)
      .then(async (response) => {
        if (response === null) {
          throw new Error("An unexpected error occured...");
        } else {
          if (
            response
          ) {
            setFormSuccess("Success! Redirecting...");
            const {name, token} = response
            dispatch(setUser({name: name, token: token}));
            return navigate("/Home");
          }
         
        }
      })
      .catch((error) => {
        setFormError( error.message || "An unexpected error occured...");
        setLoading(false);
      });
  };


  return (
    <div className="container cardShapeOut">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <Input
          {...register("username", { required: "'username' is required" })}
          autofocus
          disabled={loading}
          error={errors.username}
          placeholder="username"
          fullWidth
        />
        <Input
          {...register("password", { required: "'password' is required" })}
          disabled={loading}
          error={errors.password}
          placeholder="password"
          type="password"
          fullWidth
        />
        {formError ? <p className="error">{formError}</p> : null}
        {formSuccess ? <p className="success">{formSuccess}</p> : null}
        <Input disabled={loading} type="submit" fullWidth primary/>
      </form>
      <p>
        <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
