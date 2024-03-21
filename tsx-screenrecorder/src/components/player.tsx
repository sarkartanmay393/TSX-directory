import ReactPlayer from "react-player";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface Props {
  videoUrl?: string;
}

export default function VideoPlayer({ videoUrl }: Props) {
  const [playing, setPlaying] = useState<boolean>(false);
  const handlePlay = () => {
    setPlaying((playing) => !playing);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <div className="relative w-fit h-[60%] shadow-lg rounded-2xl overflow-hidden border-[1px] border-slate-700">
        <ReactPlayer
          id="video"
          playing={playing}
          url={videoUrl}
          width="100%"
          height="100%"
        />
        {videoUrl ? null : (
          <h3 className="absolute bottom-[50%] left-[45%] ">No video file!</h3>
        )}
      </div>
      <button
        disabled={!videoUrl}
        className="bg-slate-700 shadow-lg w-fit h-fit"
      >
        {playing ? (
          <PauseCircleIcon onClick={handlePlay} className="w-12 h-12" />
        ) : (
          <PlayCircleIcon onClick={handlePlay} className="w-12 h-12" />
        )}
      </button>
    </div>
  );
}
