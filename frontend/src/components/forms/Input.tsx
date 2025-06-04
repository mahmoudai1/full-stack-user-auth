import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type?: 'text' | 'number' | 'textarea' | 'password' | 'email';
  label: string;
  id: string;
  name?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  required?: boolean;
  rows?: number;
  error?: string;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      type = 'text',
      label,
      id,
      name,
      placeholder = '',
      className = '',
      inputClassName = '',
      labelClassName = '',
      required = false,
      rows = 3,
      error,
      ...rest
    },
    ref
  ) => {
    const baseInputClasses =
      'block w-full rounded-lg bg-gray-100 border px-3 py-1.5 text-gray-900 text-sm/6 outline-1 -outline-offset-1 outline-gray-300 transition placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600';
    const baseLabelClasses =
      'absolute -top-2 left-2 inline-block rounded-lg bg-gray-100 px-1 text-xs font-medium text-gray-900';

    return (
      <div className={`relative ${className}`}>
        <label htmlFor={id} className={`${baseLabelClasses} ${labelClassName}`}>
          {error ? <span className="m-1 text-left text-red-500 text-xs font-semibold">{error}</span> : <span>{label}</span>}
          {required && <span className="text-red-500">*</span>}
        </label>

        {type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${baseInputClasses} ${inputClassName}`}
            required={required}
            rows={rows}
            {...rest}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLInputElement>}
            className={`${baseInputClasses} ${inputClassName}`}
            required={required}
            {...rest}
          />
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
