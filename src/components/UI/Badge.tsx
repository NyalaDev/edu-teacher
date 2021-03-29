import { AiOutlineClose } from 'react-icons/ai';
import Clickable from './Clickable';

type ComponentProps = {
  text: string;
  color?: string;
  languageBadge?: string;
  closable?: boolean;
  onClose?: () => void;
};

const Badge: React.FC<ComponentProps> = ({
  text,
  color: colorToUse,
  languageBadge,
  closable,
  onClose = () => {},
}) => {
  const color =
    (languageBadge ? `language-${languageBadge}` : colorToUse) || 'gray-400';

  return (
    <div className="m-1">
      <span
        className={`px-2 bg- py-1 text-white bg-${color} rounded-md ${
          closable && 'flex items-center justify-between'
        }`}
      >
        {closable && (
          <Clickable onClick={onClose}>
            <AiOutlineClose />
          </Clickable>
        )}
        <span>{text}</span>
      </span>
    </div>
  );
};

export default Badge;
