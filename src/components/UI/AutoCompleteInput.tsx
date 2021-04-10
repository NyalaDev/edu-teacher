import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import Input from './TextInput';
import Clickable from './Clickable';

export type AutoCompleteOption = {
  id: number;
  name: string;
};

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  initialValue?: AutoCompleteOption | undefined;
  options: AutoCompleteOption[] | undefined;
  onOptionSelect: (O: AutoCompleteOption) => void;
}

const AutoCompleteInput: React.FC<Props> = ({
  name,
  label,
  placeholder,
  initialValue,
  options,
  onOptionSelect,
  onBlur,
  error,
}) => {
  const value = (initialValue && initialValue.name) || '';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value);

  const handleItemClick = (item: AutoCompleteOption) => {
    setSearch(item.name);
    setOpen(false);
    onOptionSelect(item);
  };

  useClickOutside(containerRef, () => setOpen(false));

  return (
    <div className="flex flex-col w-full" ref={containerRef}>
      <Input
        onClick={() => setOpen(!open)}
        name={name}
        placeholder={placeholder}
        label={label}
        value={search}
        onChange={e => setSearch(e.target.value)}
        error={error}
        onBlur={onBlur}
        autoComplete="off"
      />
      {open && (
        <div className="border border-gray-500 overflow-auto w-full h-40">
          {options
            ?.filter(
              item => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
            )
            .map(item => (
              <Clickable
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="w-full"
              >
                <div className="hover:bg-gray-500 cursor-pointer p-2 border-b-2 flex">
                  <span>{item.name}</span>
                </div>
              </Clickable>
            ))}
        </div>
      )}
    </div>
  );
};

AutoCompleteInput.defaultProps = {
  error: '',
  onBlur: () => {},
  placeholder: '',
  label: '',
  initialValue: {} as AutoCompleteOption,
};

export default AutoCompleteInput;
