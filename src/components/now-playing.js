import useSWR from "swr";
import fetcher from "../lib/fetcher";
import ImageCard from "./image-card";

function Info({ className = "", children }) {
  return (
    <p
      className={`w-full block overflow-hidden m-0 whitespace-nowrap text-ellipsis ${className}`}
    >
      {children}
    </p>
  );
}

export default function NowPlaying() {
  const { data } = useSWR("/api/now-playing", fetcher);

  const info = data?.isPlaying
    ? {
        src: data.albumImageUrl,
        key: data.title,
      }
    : {
        src: "/not-playing.png",
        key: "not-playing",
      };
  return (
    <ImageCard
      className="overflow-hidden"
      src={info.src}
      alt=""
      key={info.key}
      height={96}
      width={96}
    >
      <div className="overflow-hidden">
        {data?.isPlaying ? (
          <>
            <Info className="text-xs opacity-75 tracking-wider uppercase font-medium">
              Now Playing
            </Info>
            <Info className="font-medium">
              <a href={data.songUrl}>{data.title}</a>
            </Info>
            <Info className="leading-snug text-sm">{data.artist}</Info>
          </>
        ) : (
          <Info className="font-medium">
            Not Playing{" "}
            <span className="font-normal opacity-75">— Spotify</span>
          </Info>
        )}
      </div>
    </ImageCard>
  );
}
