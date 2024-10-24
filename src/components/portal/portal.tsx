import { useState, useLayoutEffect, ReactNode, FC } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
  children: ReactNode;
}

const Portal: FC<IPortalProps> = ({ children }) => {
  const [node] = useState(() => document.createElement("div"));

  useLayoutEffect(() => {
    const parentNode = document.body;
    parentNode.appendChild(node);
    return () => {
      parentNode.removeChild(node);
    };
  }, [node]);

  return createPortal(children, node);
};

export default Portal;
