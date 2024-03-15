import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  cssClasses?: string;
}

const Layout = ({ children, cssClasses }: Props) => {
  return (
    <>
      <div className={`px-6 tabletLarge:px-12 ${cssClasses}`}>
        <div className="max-w-[1400px] tablet:mx-auto">{children}</div>
      </div>
    </>
  );
};

export default Layout;
