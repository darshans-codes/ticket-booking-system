import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  min,
  max,
  step,
  rows = 4,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputStyles =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100 disabled:cursor-not-allowed";

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            disabled={disabled}
            className={`${inputStyles} resize-none ${
              Icon ? "pl-10" : ""
            }`}
          />
        ) : (
          <>
            <input
              id={name}
              type={inputType}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className={`${inputStyles} ${
                Icon ? "pl-10" : ""
              } ${type === "password" ? "pr-12" : ""}`}
            />

            {type === "password" && (
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default InputField;