
document.addEventListener("DOMContentLoaded", function() {
    let moviename = localStorage.getItem("currentmovie");
    let fav_movies = JSON.parse(localStorage.getItem("fav_movies"));
    console.log(moviename);
    console.log(fav_movies);
    const Movie_div = document.getElementById("Movie_div");

    async function getData(moviename) {
        try {
            let url = "http://www.omdbapi.com/?i=tt3896198&apikey=29ed5880&t=" + encodeURIComponent(moviename);
            let response = await fetch(url);
            let data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    getData(moviename)
        .then(data => {
            const div = `<div id="Movie-page">
                <div id="movie-header"> 
                    <p id="movie-name"><span>${data.Title}</span></p>
                    
                    <div id="movie-details">
                        <p >Imdb rating:<span> ${data.imdbRating}</span></p>
                        <p>ImdbVotes:<span> ${data.imdbVotes}</span></p>
                        <p>Released:<span> ${data.Released}</span></p>
                    </div>
                    
                   
                </div>
                <main>
                    <div id="movie-container">
                            <div id="Movie-body">
                            <div>
                                <img src="${data.Poster}">
                            </div>
                            <div id="movie-body-p">    
                                <p>${data.Plot}</p>
                                <div id="movieratings"> </div>
                                <div id="genere-buttons"></div>
                            </div>
                            </div> 
                    </div>
                <div id="movie-detail">
                <p>Actors:<span> ${data.Actors}</span> </p>
                <p>Awards:<span> ${data.Awards}</span> </p>
                <p>Boxoffice: <span>${data.BoxOffice}</span> </p>
                <p>Country: <span>${data.Country}</span> </p>
                <p>Director:<span> ${data.Director}</span> </p>
                <p>Languages: <span>${data.Language}</span> </p>
                </div>
                </main>
            </div>`;
            
            console.log("Before loop");

Movie_div.insertAdjacentHTML("beforeend", div); 
const movieratings = document.getElementById("movieratings");
data.Ratings.forEach(element => {
    console.log(element);
    const p = document.createElement("p");
    p.textContent = `${element.Source}: ${element.Value}`;
    movieratings.appendChild(p);
   
}); 
const genere_buttons = document.getElementById("genere-buttons");
let generetext=data.Genre.split(",");
generetext.forEach(data=>{
    const btn=document.createElement("button");
    btn.textContent=data;
    btn.setAttribute("class","genere_btn");
    genere_buttons.appendChild(btn);
});


console.log(generetext);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
