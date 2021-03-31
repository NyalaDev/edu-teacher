type Props = {
  data: string;
  className?: string;
};

const HtmlViewer: React.FC<Props> = ({ data, className }) => (
  // eslint-disable-next-line react/no-danger
  <div className={className} dangerouslySetInnerHTML={{ __html: data }} />
);

export default HtmlViewer;
