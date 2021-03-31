import useLanguage from '../../hooks/useLanguage';

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClasses?: string;
}

const TextInput: React.FC<Props> = ({
  type,
  label,
  placeholder,
  name,
  onChange,
  error,
  prefix,
  width,
  wrapperClasses,
  ...rest
}) => {
  const inputWidth = width || (prefix ? 'w-11/12' : 'w-full');
  const { isRtl } = useLanguage();
  return (
    <div className={`my-4 ${wrapperClasses || 'w-full'}`}>
      {label && (
        <label htmlFor={name} className="font-bold text-grey-darker block mb-1">
          {label}
        </label>
      )}

      {type === 'textarea' && (
        <textarea
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          {...rest}
        />
      )}

      {type !== 'textarea' && (
        <div
          className="flex w-full"
          style={{ direction: prefix || !isRtl ? 'ltr' : 'rtl' }}
        >
          {prefix && (
            <div className="py-2 w-3/12  align-middle bg-gray-400">
              {prefix}
            </div>
          )}
          <input
            className={`${inputWidth} py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white`}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            {...rest}
          />
        </div>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

TextInput.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  error: '',
  prefix: '',
  width: '',
  wrapperClasses: '',
};

export default TextInput;
