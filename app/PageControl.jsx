import { useState } from "react";
import Link from 'next/link';

//due to usestate being one zero based indexing will throw the program off try to keep it 1 based(--past kijani).
    const maxItemsPerPage = 10;
    
    
   
   export default function PageController(props) 
    {
        const maxPages = Math.ceil(props.trackList.length/maxItemsPerPage);
        //Ported this line from Pagination page: Find and link later
        const currentSet = props.trackList.slice((props.currentPage - 1)*maxItemsPerPage, props.currentPage * maxItemsPerPage);

        const [touchStart, setTouchStart] = useState(0);
        const [touchEnd, setTouchEnd] = useState(0);

        function handleTouchStart(e)
            {
                const start = e.targetTouches[0].clientX;
                setTouchStart(start);
        
            }
        function handleTouchEnd(e)
        {
            const end = e.changedTouches[0].clientX;
            
            // Swipe Left go to the next page
            if (touchStart - end > 75) {
                handlenext();
            } 
            // Swipe Right go to the prvious page 
            else if (touchStart - end < -75) {
                handleprev();
            }
        }
        function handlenext()
        {
            if(props.currentPage < maxPages )
            {
                props.setCurrentPage(props.currentPage + 1);
            }
        }
         function handleprev()
        {
            if(props.currentPage > 1 )
            {
                props.setCurrentPage(props.currentPage - 1);
            }
        }

        return(
            <div id="touch-box" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <ul>
                    {currentSet.map((track,index) => (<li key={index}> <Link href={'/player?id='+ track.id} >{track.title}</Link> </li>))}
                </ul>

                 {/* Buttons below are currently for testing*/}
                <button onClick={handlenext}>Next</button>
                <button onClick={handleprev}>Previous</button>
                
                
            </div>
        );
    };