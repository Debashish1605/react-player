import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Container } from '@material-ui/core';
import Control from './Control';
import { formatTime } from '../format';

const VideoPlayer = ({ url }) => {
  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  });

  const [count, setCount] = useState(0); // Define count as a state variable

  // Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking, buffer } = videoState;

  const currentTime = videoPlayerRef.current ? videoPlayerRef.current.getCurrentTime() : '00:00';
  const duration = videoPlayerRef.current ? videoPlayerRef.current.getDuration() : '00:00';

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    // Plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    // Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastFoward = () => {
    // FastForwards the video player by adding 10
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  const progressHandler = (state) => {
    if (count > 3) {
      controlRef.current.style.visibility = 'hidden'; // Toggling player control container
    } else if (controlRef.current.style.visibility === 'visible') {
      setCount(count + 1); // Update count
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) });
    videoPlayerRef.current.seekTo(parseFloat(value / 100));
  };

  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    // Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const onSeekMouseDownHandler = (e) => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = 'visible';
    setCount(0); // Reset count
  };

  const bufferStartHandler = () => {
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    setVideoState({ ...videoState, buffer: false });
  };

  // Add event listener for spacebar key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent default spacebar behavior (like scrolling)
        playPauseHandler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoState.playing]);

  return (
    <div className="video_container">
      <Container maxWidth="md" justify="center">
        <div className="player__wrapper" onMouseMove={mouseMoveHandler}>
          <ReactPlayer
            ref={videoPlayerRef}
            className="player"
            url={url}
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={progressHandler}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
          />

          {buffer && <p>Loading</p>}

          <Control
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            playRate={playbackRate}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onMouseSeekDown={onSeekMouseDownHandler}
          />
        </div>
      </Container>
    </div>
  );
};

export default VideoPlayer;
