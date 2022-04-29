import React, { useState } from 'react';

interface IFormInput {
  id: string;
  name: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  label?: string;
  ariaLabel?: string;
  value?: string;
  errorMessage?: string;
  autoComplete?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = (props: IFormInput) => {
  const { errorMessage, ariaLabel, label, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true);
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    inputProps.name === 'confirmPassword' && setFocused(true);
  };

  return (
    <div
      className={`flex relative w-full 
      ${inputProps.type === 'checkbox' ? 'flex-row-reverse justify-end items-center' : 'flex-col'}`}
    >
      <label
        htmlFor={inputProps.id}
        className={`mt-[5px] mb-2 
        ${label && 'block'} 
        ${inputProps.type === 'checkbox' && 'ml-2'} `}
      >
        {label}
      </label>
      <input
        {...inputProps}
        className={`p-[10px] mt-[5px] mb-2 rounded-tl-xl rounded-br-xl border-2 outline-none border-indigo-300 focus:border-indigo-500 transition-all 
        ${errorMessage && focused && 'border-red-500'} 
        ${inputProps.type === 'checkbox' ? 'w-auto' : 'w-full'}`}
        aria-label={ariaLabel}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {errorMessage && focused && (
        <span className='text-red-600 text-xs italic mb-1'>{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
