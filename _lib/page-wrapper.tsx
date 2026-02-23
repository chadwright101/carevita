import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  cssClasses?: string;
}

const PageWrapper = ({ children, cssClasses }: Props) => {
  return (
    <>
      <div className={`px-6 desktop:px-0 ${cssClasses}`}>
        <div className="max-w-[1280px] tablet:mx-auto">{children}</div>
      </div>
    </>
  );
};

export default PageWrapper;
