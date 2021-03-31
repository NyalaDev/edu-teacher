interface Props extends React.InputHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Clickable: React.FC<Props> = ({
  onClick,
  children,
  disabled,
  className,
}) => (
  <button
    className={`border-none outline-none focus:outline-none ${className}`}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Clickable;
