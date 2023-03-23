import { ReactNode } from "react";
import Header from "./header";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="px-5">{children}</div>
    </>
  );
};

export default Layout;
