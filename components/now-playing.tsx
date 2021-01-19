import useSWR from "swr";
import fetcher from "../lib/fetcher";
import ImageCard from "./image-card";
import styles from "./now-playing.module.css";

export default function NowPlaying() {
  const { data } = useSWR("/api/now-playing", fetcher);

  if (data && data.isPlaying) {
    return (
      <ImageCard
        className={styles.card}
        src={data.albumImageUrl}
        alt=""
        key={data.title}
        height={96}
        width={96}
      >
        <div className={styles.metadata}>
          <p className={styles.tag}>Now Playing</p>
          <p className={styles.title}>
            <a href={data.songUrl}>{data.title}</a>
          </p>
          <p className={styles.artist}>{data.artist}</p>
        </div>
      </ImageCard>
    );
  }
  return (
    <ImageCard
      className={styles.card}
      src="/not-playing.png"
      alt=""
      key="not-playing"
      height={96}
      width={96}
    >
      <div className={styles.metadata}>
        <p className={styles.title}>
          Not Playing <span className={styles.spotify}>— Spotify</span>
        </p>
      </div>
    </ImageCard>
  );
}
