interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: () => void;
  error?: string;
  mode?: "dark" | "light";
  options: Option[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  label,
  value,
  onChange,
  onFocus,
  error,
  mode = "light",
  options,
}) => {
  const errors = error?.replaceAll("[", " ").replaceAll("]", " ");
  return (
    <div className="mb-3">
      <label className="text-sm text-slate-600">{label}</label>
      <div className="relative mt-2">
        <select
          id={id}
          className={`w-full ${
            mode == "dark" ? "bg-gray-600" : "bg-slate-300"
          } px-4 py-[0.4rem] focus:outline-none focus:ring-2 focus:ring-sky-600 rounded-md cursor-pointer hover:ring-2 hover:ring-sky-600 appearance-none ${
            error ? "form-invalid" : ""
          }`}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
        >
          <option value="" disabled>
            Select a category
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.2"
          stroke="currentColor"
          className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
      {errors && (
        <ul className="text-red-500 text-sm my-2 italic ">
          {errors.split(",").map((err, index) => (
            <li className="before:content-['*']" key={index}>
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormSelect;
