export default function AlbumCoverButton(props)
{
    return(
        <button onClick = {props.onToggle} className="album-cover-btn">
            <img id= "cover" src={props.cover} alt={props.title}></img>
        </button>
    );
}