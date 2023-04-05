import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="px-6 tabletLarge:px-12">
        <div className="max-w-[1400px] tablet:mx-auto">{children}</div>
      </div>
    </>
  );
};

export default Layout;
