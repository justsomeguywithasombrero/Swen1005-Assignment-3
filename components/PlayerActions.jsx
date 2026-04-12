export default function PlayerActions(props)
{
    return(
        <div id ="song-box">
            <button id="prev"onClick={props.goToPreviousTrack}>Previous</button>
            <button id="play-pause"onClick={props.togglePlayPause}>{props.isPlaying ? 'Pause' : 'Play'}</button>
            <button id="next"onClick={props.goToNextTrack}>Next</button>
        </div>
    );
}