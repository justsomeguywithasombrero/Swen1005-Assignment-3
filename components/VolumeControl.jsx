export default function VolumeControl(props)
{
    return(
        <input id="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={props.volume}
            onChange={props.handleVolumeChange}
        />
    );
}