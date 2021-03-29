type ComponentProps = {
  active: boolean;
  size?: number;
};

const ActivityIndicator: React.FC<ComponentProps> = ({
  active,
  children,
  size = 12,
}) => {
  if (!active) {
    return <>{children}</>;
  }

  return (
    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-gray-900`}
      />
    </div>
  );
};

export default ActivityIndicator;
