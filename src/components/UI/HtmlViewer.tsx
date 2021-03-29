type ComponentProps = {
  data: string;
  className?: string;
};

const HtmlViewer: React.FC<ComponentProps> = ({ data, className }) => (
  // eslint-disable-next-line react/no-danger
  <div className={className} dangerouslySetInnerHTML={{ __html: data }} />
);

export default HtmlViewer;
