import useSWR from "swr";
import fetcher from "../lib/fetcher";
import styles from "./top-tracks.module.css";

export default function TopTracks() {
  const { data } = useSWR("/api/top-tracks", fetcher);

  if (data) {
    return (
      <ul className={styles.list}>
        {data.tracks.map((track) => (
          <li>
            <a className={styles.title} href={track.songUrl}>
              {track.title}
            </a>
            <p className={styles.artist}>{track.artist}</p>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className={styles.list}>
      <li>Loading...</li>
    </ul>
  );
}
