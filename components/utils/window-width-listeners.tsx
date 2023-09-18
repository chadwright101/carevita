import { useState, useEffect } from "react";
import WindowWidthContext from "./window-width-context";

interface Props {
  children: React.ReactNode;
}

const WindowWidthListener = ({ children }: Props) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={{ windowWidth }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export default WindowWidthListener;
