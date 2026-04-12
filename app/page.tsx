'use client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import PageControl from './PageControl.jsx';
import { tracks } from '@/lib/tracks';
export default function HomePage() {

const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);

const handleSearch = (e: ChangeEvent <HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();
    setSearchTerm(text);
    setCurrentPage(1); 
  };

//Comoares user entered text to track list titles 
  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(searchTerm)
  );

 return (
 <main>
 <div id="song-box">
           
            <h2>Sonify Playlist</h2>
            <input type="text" id="search-bar" placeholder="🔎Search song...." onChange={handleSearch}/>
            <PageControl
            trackList = {filteredTracks}
            currentPage = {currentPage}
            setCurrentPage = {setCurrentPage} />
           
</div>
 
 <Link href="/player">Open Player</Link>
 </main>
 );
}
