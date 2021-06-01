import useSWR from "swr";
import fetcher from "../lib/fetcher";
import styles from "./top-tracks.module.css";

export default function TopTracks() {
  const { data } = useSWR("/api/top-tracks", fetcher);

  if (data) {
    return (
      <div className={styles.list}>
        {data.tracks.map((track) => (
          <div className={styles.item}>
            <a className={styles.title} href={track.songUrl}>
              {track.title}
            </a>
            <p className={styles.artist}>{track.artist}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.list}>
      <div className={styles.item}>Loading...</div>
    </div>
  );
}
