import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ videoUrl }) {
  return (
    <div className="video-player">
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width="100%"
        height="50vh"
        style={{}}
      />
    </div>
  );
}

export default VideoPlayer;
