import { AiOutlineClose } from 'react-icons/ai';
import Clickable from './Clickable';

type Props = {
  text: string;
  color?: string;
  languageBadge?: string;
  closable?: boolean;
  onClose?: () => void;
};

const Badge: React.FC<Props> = ({
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
          closable && 'flex items-center justify-between '
        }`}
      >
        {closable && (
          <Clickable onClick={onClose}>
            <AiOutlineClose />
          </Clickable>
        )}
        <span className="text-sm">{text}</span>
      </span>
    </div>
  );
};

export default Badge;
