export default function ProgressControl(props)
{
    return(
        <input id="progress-slider"
            type="range"
            min="0"
            max={props.duration || 0}
            step="0.1"
            value={props.progress}
            onChange={props.handleSeek}
        />
    );
}