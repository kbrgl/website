import Link from "next/link";
import styles from "./project.module.css";

export default function Project({ project }) {
  const { name, description, slug, link, image } = project;

  return (
    <Link href={link || `/p/${slug}`}>
      <a className={styles.projectLink}>
        <div className={styles.project}>
          <img
            className={styles.projectImage}
            src={`/projects/${image}`}
            alt=""
            width={175}
            height="auto"
          />
          <p>
            <span className={styles.projectName}>{name}</span>
            <span className={styles.projectDescription}>{description}</span>
          </p>
        </div>
      </a>
    </Link>
  );
}
