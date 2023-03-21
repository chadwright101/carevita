import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="px-5">{children}</div>;
};

export default Layout;
