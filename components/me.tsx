import Image from "next/image";
import styles from "./me.module.css";

export default function Me() {
  return (
    <div className={styles.picture}>
      <Image
        className={styles.me}
        layout="fixed"
        height={120}
        width={120}
        priority
        quality={100}
        src="/me.png"
        alt="Me"
      />
    </div>
  );
}
