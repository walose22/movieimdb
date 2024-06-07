
document.addEventListener("DOMContentLoaded", function() {
const search_container=document.getElementById("search_container");
const search_bar=document.getElementById("search-bar");
const search_input=document.getElementById("search");
const search_icon=document.getElementsByClassName("searchicon");
let fav_movies = JSON.parse(localStorage.getItem('fav_movies')) || [];
console.log(fav_movies);
// Retrieve currentmovie from localStorage if it exists
let currentmovie = localStorage.getItem('currentmovie') || '';
async function getData(moviename){
    try{
        let url="http://www.omdbapi.com/?i=tt3896198&apikey=29ed5880&t="+encodeURIComponent(moviename);
     let response = await fetch(url);
    // console.log(data);
    let data=await response.json();
    
    return data;
    }
catch(err){
    console.log(err);
}
}
search_input.addEventListener("keypress", async function(event){
    if (event.key === "Enter") {
        let inputText = search_input.value;
        currentmovie=inputText;
        console.log(currentmovie);
        let data=await getData(inputText);
        let cardElements = search_container.querySelectorAll("#card");
        cardElements.forEach(card => card.remove());
        localStorage.setItem('currentmovie', currentmovie);
        // Save fav_movies to localStorage (after stringifying)
        localStorage.setItem('fav_movies', JSON.stringify(fav_movies))
        console.log(fav_movies);
        create_movie_div(data);
        // Save currentmovie to localStorage
        
        search_input.value = '';
    }
});

document.addEventListener("click", function(event) {
    if (event.target !== search_input) {
        search_input.value = '';
    }
});
function create_movie_div(data){
    if (data.Error === "Movie not found!" || data.Response === "False") {
        const div = `<div id="msg">Error: Movie not found</div>`;
        search_container.insertAdjacentHTML("beforeend", div);
    } else {
    if (!Array.isArray(data)) {
        data = [data]; // Convert single object to array with one element
    }
   console.log(data);
    data.forEach(element => {
        const div = `<div id="card">
            <div id="card-info">
               <a href="index2.html" target="_blank"> <img src="${element.Poster}"></a>
                <pre>${element.Title}<br>${element.Year}<br>${element.Actors}<br>${element.Awards}<br>${element.BoxOffice}</pre>
            </div>
            <div id="card-buttons">
                <button class="button" data-moviename=${element.Title} >Favorites</button>
            </div>
        </div>`;
        
        // console.log(currentmovie);
        search_container.insertAdjacentHTML("beforeend", div);
    });
}
}

//code to handle the fav button
document.addEventListener("click", (event) => {
    if (event.target.classList.contains('button')) {
        let moviename = event.target.getAttribute("data-moviename");
        if (!event.target.classList.contains("red")&& !fav_movies.includes(moviename)) {
            fav_movies.push(moviename);
            console.log(moviename);
            event.target.classList.add("red");
            console.log(fav_movies);
        } else {
            fav_movies = fav_movies.filter(movie => movie !== moviename);
            event.target.classList.remove("red");
            console.log(fav_movies);
        }
        localStorage.setItem('fav_movies', JSON.stringify(fav_movies));
        console.log("Favorite Movies: ", fav_movies);
    }
});

});
