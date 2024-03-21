import { useEffect, useState } from "react";
import VideoPlayer from "./components/player";

const options: DisplayMediaStreamOptions = {
  video: true,
  audio: true,
};

function App() {
  const recordedChunks: Blob[] = [];
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder>();
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getDisplayMedia(options);
    setStream(stream);
    const recorder = new MediaRecorder(stream);
    recorder.addEventListener("dataavailable", handleDataAvailable);
    recorder.addEventListener("stop", handleOnStop);
    recorder.start();
    setRecorder(recorder);
  };

  const handleOnStop = (e: Event) => {
    e.stopPropagation();
    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    (document.getElementById("video") as HTMLVideoElement).src = url;
    setIsRecording(false);
  };

  const handleDataAvailable = (e: BlobEvent) => {
    recordedChunks.push(e.data);
  };

  const handleStopRecording = async () => {
    stream?.getTracks().forEach((track) => track.stop());
    recorder?.stop();
  };

  const handleDownload = async () => {};

  useEffect(() => {
    return () => {
      // videoUrl && URL.revokeObjectURL(videoUrl);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-2">
      {videoUrl ? (
        <div className="h-[80%] w-full flex items-center justify-center mt-[-10rem]">
          <VideoPlayer videoUrl={videoUrl} />
        </div>
      ) : null}
      {isRecording ? (
        <button className="w-fit bg-red-600" onClick={handleStopRecording}>
          Stop
        </button>
      ) : (
        <button className="w-fit bg-sky-600" onClick={handleRecording}>
          Record
        </button>
      )}
      {videoUrl ? (
        <a
          href={videoUrl}
          download="recorded-video.mp4"
        >
          Download
          
        </a>
      ) : null}
    </div>
  );
}

export default App;
