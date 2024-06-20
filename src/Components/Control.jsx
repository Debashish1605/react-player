import React from "react";
import {
  makeStyles,
  Slider,
  withStyles,
  Button,
  Tooltip,
  Popover,
  Grid,
} from "@material-ui/core";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  SkipNext,
  VolumeUp,
  VolumeOff
} from "@material-ui/icons";
import "./Control.css";

const useStyles = makeStyles({
  volumeSlider: {
    width: "100px",
    color: "#9556CC",
  },

  bottomIcons: {
    color: "#999",
    padding: "12px 8px",

    "&:hover": {
      color: "#fff",
    },
  },
});

const PrettoSlider = withStyles({
  root: {
    height: 4,
    color: "#FF0000", // YouTube's red color for the track
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#606060", // Gray color for the thumb
    border: "2px solid #FFFFFF", // White border around the thumb
    marginTop: -3,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.8)",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: "100%",
    backgroundColor: "#0000FF",
    marginLeft: 0,
  },
  rail: {
    height: 5,
    borderRadius: 4,
    color: "#000000",
  },
})(Slider);

const Control = ({
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  volume,
  mute,
  onMute,
  duration,
  currentTime,
  onMouseSeekDown,
  controlRef
}) => {
  const classes = useStyles();


  return (
    <div className="control_Container" ref ={controlRef}>
      <div className="top_container">
      </div>

      <div className="bottom__container">
        <div className="slider__container">
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          />
        </div>
        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? (
                <Pause fontSize="medium" />
              ) : (
                <PlayArrow fontSize="medium" />
              )}{" "}
            </div>

            <div className="icon__btn">
              <SkipNext fontSize="medium" />
            </div>

            <div className="icon__btn" onClick={onMute}>
            {mute ? (
                  <VolumeOff fontSize="medium" />
                ) : (
                  <VolumeUp fontSize="medium" />
                )}
            </div>

            <Slider
              className={`${classes.volumeSlider}`}
              onChange={onVolumeChangeHandler}
              value={volume * 100}
              onChangeCommitted={onVolumeSeekUp}
            />

            <span style={{marginLeft: "70%"}}>{ currentTime} : {duration}</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Control;
