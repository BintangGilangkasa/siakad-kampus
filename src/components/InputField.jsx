import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  required = false,
  className = '',
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 tracking-wide">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full py-3 px-4 ${Icon ? 'pl-11' : ''} ${
            isPasswordType ? 'pr-11' : ''
          } bg-slate-50 border ${
            error
              ? 'border-rose-400 ring-2 ring-rose-100 text-rose-900'
              : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          } rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 transition-all focus:outline-none`}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition"
            title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-rose-500 font-medium pl-1">{error}</p>}
    </div>
  );
}