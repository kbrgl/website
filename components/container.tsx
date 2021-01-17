import { ReactNode } from "react";
import styles from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
