document.addEventListener("DOMContentLoaded", function() {
    // Function to handle updating UI with favorite movies list
    let fav_movies;
    function updateFavoriteMovies() {
        // Retrieve favorite movies list from localStorage
        fav_movies = JSON.parse(localStorage.getItem('fav_movies')) || [];
        console.log("Favorite Movies Loaded: ", fav_movies);
        // const favMoviesContainer = document.getElementById("fav_movies_container");
        const fav_list=document.getElementById("fav_list");
        // Iterate over the fav_movies list and create image elements
        fav_movies.forEach(async movie => {
            
            let data=await getMoviePosterUrl(movie); 
            const div=`<div id="div_details">
            <div id="fav_img_container"><img src=${data.Poster}></div>
            <div id="fav_details_container"><p>${data.Title}</p>
            <p>${data.Released}</p>
            <p>${data.Language}</p>
            <button class="button">Remove</button>
            </div>
            </div>`;
            fav_list.insertAdjacentHTML('beforeend',div);
            // fav_list.appendChild(div);
            // fav_list.appendChild(divdetails);
        });
    }
    document.addEventListener("click",(event)=>{
        if(event.target.classList.contains("button")){
            let div=event.target.parentNode;
            let moviename = div.querySelector("p");
            // let grandparentDiv = div.parentNode;
            let movieNameText = moviename.textContent;
            let movieIndex = fav_movies.indexOf(movieNameText);
            if (movieIndex !== -1) {
                // Remove the movie from the fav_movies array
                fav_movies.splice(movieIndex, 1);
                // Update the fav_movies array in localStorage
                localStorage.setItem('fav_movies', JSON.stringify(fav_movies));
                // Remove the parent div from the DOM
                div.parentNode.remove();
            }
            
        }
    });
  async function getMoviePosterUrl(movie){
    try {
        let url = "http://www.omdbapi.com/?i=tt3896198&apikey=29ed5880&t=" + encodeURIComponent(movie);
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
   }
    // Call the function to load favorite movies when the page is initially loaded
    updateFavoriteMovies();

    // Event listener to listen for changes in localStorage
    window.addEventListener('storage', function(event) {
        if (event.key === 'fav_movies') {
            // Call the function to update UI with the updated favorite movies list
            updateFavoriteMovies();
        }
    });

    
});