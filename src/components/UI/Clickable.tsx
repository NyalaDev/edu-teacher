type ComponentProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const Clickable: React.FunctionComponent<ComponentProps> = ({
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
