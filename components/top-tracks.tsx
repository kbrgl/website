import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Loader from "./loader";

export default function TopTracks() {
  const { data } = useSWR("/api/top-tracks", fetcher);

  if (data) {
    return (
      <div className="divide-y border rounded-lg overflow-hidden">
        {data.tracks.map((track) => (
          <a
            className="flex flex-col md:flex-row md:items-center p-5 hover:bg-gray-50 transition-colors space-y-3 md:space-y-0 md:space-x-3"
            href={track.songUrl}
            key={track.songUrl}
          >
            <img
              className="h-16 w-16 rounded-lg shadow-md"
              src={track.imageUrl}
              alt=""
            />
            <div>
              <p className="font-medium">{track.title}</p>
              <p className="text-gray-500">{track.artist}</p>
            </div>
          </a>
        ))}
      </div>
    );
  }
  return (
    <div className="p-5 border rounded-lg">
      <Loader />
    </div>
  );
}
