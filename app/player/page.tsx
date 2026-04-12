'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { tracks } from '@/lib/tracks';
import AlbumCover from '@/components/AlbumCoverButton'
import ProgressControl from '@/components/ProgressControl'
import VolumeControl from '@/components/VolumeControl'
import PlayerActions from '@/components/PlayerActions'
import { useSearchParams } from 'next/navigation';
export default function PlayerPage() {
 const searchParams = useSearchParams();
 const trackId = searchParams.get('id');
 const audioRef = useRef<HTMLAudioElement>(null);
 const [currentTrackIndex, setCurrentTrackIndex] = useState(Number(trackId) - 1||0);
 const [isPlaying, setIsPlaying] = useState(false);
 const [progress, setProgress] = useState(0);
 const [duration, setDuration] = useState(0);
 const [volume, setVolume] = useState(0.7);
 const [isLoaded, setIsLoaded] = useState(false);
 const currentTrack = tracks[currentTrackIndex];

 useEffect(() => {  
    const audio = audioRef.current;
    if (!audio) return;
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setProgress(audio.currentTime || 0);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    //This function is referred to as the cleanup function it runs before useEffect is destroyed currently it used to uncouple listeners before object destruction.
    return () => {
    audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
}, [currentTrackIndex]);

const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
    audio.pause();
    setIsPlaying(false);
    } else {
    await audio.play();
    setIsPlaying(true);
    }
};

const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);
    if (!audio) return;
    audio.currentTime = nextTime;
    setProgress(nextTime);
};
 const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 const audio = audioRef.current;
 const nextVolume = Number(event.target.value);
 setVolume(nextVolume);
 if (audio) audio.volume = nextVolume;
};


 const goToNextTrack = () => {
 setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
 setProgress(0);
};
const goToPreviousTrack = () => {
 setCurrentTrackIndex((prev) =>
 prev === 0 ? tracks.length - 1 : prev - 1
 );
 setProgress(0);
};

//Loader function: Loads information into variables
useEffect(() => {
 const savedVolume = localStorage.getItem('player-volume');
 const savedTrack = localStorage.getItem('player-track-index');
 if(!trackId)
 {
    if (savedTrack !== null) setCurrentTrackIndex(Number(savedTrack));
 }
 if (savedVolume !== null) setVolume(Number(savedVolume));
 setIsLoaded(true);
}, []);

//Save function: updates information into variables
useEffect(() => {
   if(isLoaded == true)
   {
      localStorage.setItem('player-volume', String(volume));
      localStorage.setItem('player-track-index', String(currentTrackIndex));
   }
 
}, [isLoaded,volume, currentTrackIndex]);


const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);

function handleTouchStart(e: React.TouchEvent)
      {
         const start = e.targetTouches[0].clientX;
         setTouchStart(start);
        
      }
function handleTouchEnd(e: React.TouchEvent)
      {
         const end = e.changedTouches[0].clientX;
            
         // Swipe Left go to the next page
         if (touchStart - end > 75)
            {
               goToNextTrack();
            } 
         // Swipe Right go to the prvious page 
         else if (touchStart - end < -75)
            {
               goToPreviousTrack();
               
            }
      }


 return (
 <main className="player-screen">
 <Link href="/">Back to Library</Link>
<div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
   <AlbumCover id = "cover"
    cover = {currentTrack.cover}
    title = {currentTrack.title}
    onToggle = {togglePlayPause}
    />
 <h1>{currentTrack.title}</h1>
 <p>{currentTrack.artist}</p>
</div>
 
 
 <label>Progress</label>
 <ProgressControl 
    duration={duration}
    progress={progress}
    handleSeek={handleSeek}
 />
 
 <label>Volume</label>
 <VolumeControl 
    volume = {volume}
    handleVolumeChange = {handleVolumeChange}
 />

 <PlayerActions
    goToPreviousTrack = {goToPreviousTrack}
    goToNextTrack = {goToNextTrack}
    togglePlayPause = {togglePlayPause}
    isPlaying = {isPlaying}
 />
 
 <audio ref={audioRef} src={currentTrack.src} preload="metadata" />
 </main>
); 
 
}
