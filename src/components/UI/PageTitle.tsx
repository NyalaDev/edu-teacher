import Badge from './Badge';

type BadgeType = {
  text: string;
  color: string;
};

type PageTitleProps = {
  title: string;
  badge?: BadgeType;
};

const PageTitle: React.FC<PageTitleProps> = ({ title, badge }) => {
  return (
    <div className="mb-5 border-b border-gray-300 flex items-center">
      <h1 className="text-4xl font-bold leading-tight">{title}</h1>
      {badge && <Badge text={badge.text} color={badge.color} />}
    </div>
  );
};

export default PageTitle;
