import { createContext } from "react";

interface Props {
  windowWidth: number;
}

const WindowWidthContext = createContext<Props>({
  windowWidth: 0,
});

export default WindowWidthContext;
