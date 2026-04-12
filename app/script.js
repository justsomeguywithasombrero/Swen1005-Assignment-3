
//Array of 50 songs.
const songs_list= [
    "Brent Faiyaz - Pistachios",
    "Brent Faiyaz - Rolling Stone",
    "Overtonight - Comfort Song 4 U",
    "Blanco - Regime",
    "Overtonight - Mirrors Demo",
    "BabyTron - 1-800",
    "Loe Shimmy ft. Brent Faiyaz - For Me",
    "Vano 3000 - Running Away",
    "Baby Keem - Booman",
    "Jae Loaded - Tryna Get To You",
    "Baby Keem - 16",
    "Tayk Ai - Cant Change My Ways",
    "A$AP Rocky - Lovers Rocky",
    "Stanwill x BabyTron - Last Forever",
    "Kanye West - 530",
    "Heritier - Sweet Dreams",
    "Rio Da Young OG - Different Music",
    "Drake - Not You Too",
    "Brent Faiyaz - Trust",
    "Brent Faiyaz - Clouded",
    "Blanco - Ponzi Scheme",
    "Brent Faiyaz - Wish You Well",
    "Brent Faiyaz - Jackie Brown",
    "Blanco - This System",
    "Noevdv - Want U",
    "Cordae ft. Anderson Paak - Two Tens",
    "Kendrick Lamar - Rich Spirit",
    "Drake ft. 21 Savage - Jimmy Cooks",
    "Cordae ft. Anderson Paak - Summer Drop",
    "Khalid - Location",
    "The Weeknd - Starboy",
    "Blanco - Brilliant Mind",
    "Post Malone - White Iverson",
    "Post Malone ft. Swae Lee - Sunflower",
    "Hozier - Francesca",
    "Hotel Ugly - Is There Free Breakfast Here",
    "Hotel Ugly - Shut Up My Moms Calling",
    "Vance Joy - Riptide",
    "Gigi Perez - Sailor Song",
    "Richy Mitch & The Coal Miners - Evergreen",
    "Famy - Ava",
    "Ekkstacy - I Walk This Earth All By Myself",
    "Baby Keem - Honest",
    "Baby Keem - Orange Soda",
    "Ant Saunders - Yellow Hearts",
    "Post Malone - Wow",
    "Post Malone - Circles",
    "The Rare Occasions - Notion",
    "Diplo ft. Trippie Red - Wish",
    "Blanco - Londis",
    "Brent Faiyaz - Been Away"
];

//Variable definitions for the default page and the number of songs per page.
let currentPage =0;
let songsPerPage = 10;

//Function to display 10 songs per scroll
function displayPage(page)
{
    //Finds and stores a reference to the song-list id in a ul element
    const ul = document.getElementById("song-list");
    //Used to clear the ul for every iteration of the displayPage func
    ul.innerHTML = "";

    const start = page * songsPerPage;
    const end = start + songsPerPage;
    // A for loop that goes from 0 - 9 (although end does = 10, i < 10 stops at 9)
    //Every loop adds one li element to the overall ul element.
    //when the amount of li elements == 10 the loop ends and the function exits
    for(let i = start; i < end; i++)
    {
        //Creates a list element called li
        const li = document.createElement("li");
        //Puts text retrieved from the song_list array in a li tag
        li.textContent = songs_list[i];
        //Appends the ul with a li element 
        ul.appendChild(li);
        //An event listener is put onto the li element listening for a click
        li.addEventListener("click",function(){
            //After recieveing that click itll construct and launch a url for song{i}: i.e if i = 1, song 1
            window.location.href = "Player2.html?song=" + i;
        });


    }
}

function touchControl()
{
    let touchStartY = 0;
    //The browser "listens" for user interaction specifically that of a touch event 
    document.addEventListener("touchstart",function(e){
    //Data about the vertical(y-axis) info about a finger touching the screen is stored in touchStartY
       touchStartY =  e.touches[0].clientY;
    });
    //The browser again listens for a touch event however this is for when the finger is raised 
    document.addEventListener("touchend",function(e){
        //Data abut the vertical(y-axis) about a finger lifting from the screen is stored in touchEndY
        const touchEndY = e.changedTouches[0].clientY;
        //a variable diff that stores the distance travelled from the start touch to the end touch.
        const diff = touchStartY - touchEndY;

        //If statement that ensures the distance travelled fits into the 50 px limit AND the current page doesnt exceed 4(staying within the bounds of the array).
        if(diff > 50 && currentPage < 4)
        {
            //We iterate current page here in order to switch to our next 10 songs 
            currentPage += 1;
            //We display this new list of 10 songs
            displayPage(currentPage);

        }

        //If statement that ensure the user cant loop beyond the base page when scrolling back up
        else if(diff < -50 && currentPage > 0)
        {
            //Reduce the currentpage value for it to return to the previous list of 10 songs
            currentPage -= 1;
            //Display that previous list of 10 songs
            displayPage(currentPage);
        }
    });
}

//This function reads user text from a search bar and appends a ul with a li element if the user text is included in any elemnts from the song array
function searchSong()
{
    //Creating a ul and pointing it to the ul in the html doc
    const ul = document.getElementById("song-list");
    //Points to the search bar in the html document, reads the text content and sets it all to lowercase 
    const userText = document.getElementById("search-bar").value.toLowerCase();
    //Empties the ul element in case its populated with anything
    ul.innerHTML = "";
    for(let i = 0;i < songs_list.length;i++)
    {
        if(songs_list[i].toLowerCase().includes(userText))
        {
                //Creates a list element called li
                const li = document.createElement("li");
                //Puts text retrieved from the song_list array in a li tag
                li.textContent = songs_list[i];
                //Appends the ul with a li element 
                ul.appendChild(li);

            //An event listener is put onto the li element listening for a click
            li.addEventListener("click",function(){
            //After recieveing that click itll construct and launch a url for song{i}: i.e if i = 1, song 1
            window.location.href = "Player2.html?song=" + i;
        });
        }
    }
}
//Adds an even listener to the search bar, listening for input then calling the search song function 
document.getElementById("search-bar").addEventListener("input",searchSong);

//Function call passing the "Global" variable currentPage
displayPage(currentPage);
//Function call calling touchControl which enables loading and swapping of 10 song lists
touchControl();
