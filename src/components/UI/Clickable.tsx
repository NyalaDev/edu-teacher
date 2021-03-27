import styled from 'styled-components';

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: 0 !important;
`;

type ComponentProps = {
  onClick: () => void;
  disabled?: boolean;
};

const Clickable: React.FunctionComponent<ComponentProps> = ({
  onClick,
  children,
  disabled,
}) => (
  <StyledButton type="button" onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

export default Clickable;
