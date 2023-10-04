import "./styles.scss";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const DefaultContainer = ({ children }: Props) => {
  return <div className="container">{children}</div>;
};
