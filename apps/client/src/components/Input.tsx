import React from "react";
import { FieldError } from "react-hook-form";
import  "../styles/login.scss";

export interface InputProps {
  autofocus?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  primary?: boolean;
  type?: string;
  error?: FieldError;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <div className="containerInput">
        <input
          autoComplete="off"
          autoFocus={props.autofocus}
          className={`input ${
            props.fullWidth ? "fullWidth" : ""
          } ${props.primary ? "primary" : ""} ${
            props.error ? "error" : ""
          }`}
          disabled={props.disabled}
          placeholder={props.placeholder}
          ref={ref}
          type={props.type || "text"}
          onChange={props.onChange}
          onBlur={props.onBlur}
          name={props.name}
        />
        {props.error && <p className="error">{props.error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";