import React, { InputHTMLAttributes } from "react";
import {
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const TextInput: React.FC<InputProps> = ({ register, type, required, onChange, disabled, label, id, value, error }) => {
  return (
    <div className="relative flex flex-col">
      <input
        {...register(id, {required: required || false})}
        required={required}
        id={id}
        disabled={disabled}
        type={type}
        onChange={onChange}
        className={`border rounded-lg p-3 text-lg focus:outline-none transition-colors peer ${disabled ? "bg-opacity-80 bg-slate-100" : "bg-transparent"} duration-300 w-full ${error ? "border-red-600 focus:border-red-600" : "border-gray-400 focus:border-sky-400"}`}
        autoComplete="off"
      />
      <label
        htmlFor={id}
        className={`absolute left-2 mt-1 peer-focus:mt-0 top-2 rounded-lg cursor-text text-gray-500 text-xl peer-focus:bg-white px-2 peer-focus:text-base peer-focus:-top-3 peer-focus:left-2 peer-focus:text-sky-800 transition-all duration-500 ${
          value && "mt-0 bg-white text-base -top-3 left-2 dark:text-sky-400 text-sky-800"
        }`}
      >
        {label}
      </label>

      {error && (
        <p className="text-sm text-red-600 text-right mt-1">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
