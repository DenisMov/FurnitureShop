import { ReactNode } from "react";
import "./CartNotifyModal.scss";

export function CartNotifyModal({ children }: { children: ReactNode }) {
  return (
    <div className="сartNotifyModal">
      <div className="сartNotifyModal__success">{children}</div>
    </div>
  );
}
