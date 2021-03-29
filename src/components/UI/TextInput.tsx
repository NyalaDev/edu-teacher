/* eslint-disable react/jsx-props-no-spreading */
import useLanguage from '../../hooks/useLanguage';

interface ComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  forceLtr?: boolean;
  error?: string;
  wrapperClasses?: string;
}

const TextInput: React.FC<ComponentProps> = ({
  type,
  label,
  placeholder,
  name,
  onChange,
  error,
  prefix,
  forceLtr,
  width,
  wrapperClasses,
  ...rest
}) => {
  const inputWidth = width || (prefix ? 'w-11/12' : 'w-full');
  const { isRtl } = useLanguage();
  return (
    <div className={`${wrapperClasses || 'w-full'}`}>
      {label && (
        <label htmlFor={name} className="font-bold text-grey-darker block mb-2">
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
  forceLtr: false,
  width: '',
  wrapperClasses: '',
};

export default TextInput;
