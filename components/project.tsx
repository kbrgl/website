import Link from "next/link";
import styles from "./project.module.css";

export default function Project({ project }) {
  const { name, description, slug, link, image } = project;

  return (
    <Link href={link || `/p/${slug}`}>
      <a className={styles.link}>
        <div className={styles.project}>
          <img
            className={styles.image}
            src={`/projects/${image}`}
            alt=""
            width={175}
          />
          <p>
            <span className={styles.name}>{name}</span>
            <span className={styles.description}>{description}</span>
          </p>
        </div>
      </a>
    </Link>
  );
}
