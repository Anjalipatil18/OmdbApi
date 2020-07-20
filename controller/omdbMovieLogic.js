const fetch = require('node-fetch');
const MovieModel = require('../model/movieDb');
const SeriesModel = require('../model/seriesDb');
const EpisodeModel = require('../model/episodeDb');

const omdbMovie = async (imdbId, callback) => {
    let hostMovieData  = await fetch(`https://www.omdbapi.com/?apikey=7c1f340b&i=${imdbId}`)
    let movieData =  await hostMovieData.json();
    let data = {
        Title: movieData["Title"],
        Year: movieData["Year"],
        Released: movieData["Released"],
        Genre: movieData["Genre"],
        Director: movieData["Director"],
        Awards: movieData["Awards"],
        ImdbID: movieData["imdbID"],
        Type: movieData["Type"],
        Ratings: movieData["Ratings"]
    };
    return data       
}

const typeData = async (imdbId, callback) =>{
        let omdbMovieData = await omdbMovie(imdbId)
        let Type = omdbMovieData["Type"]
        if(Type == "movie") {
            let Movies = new MovieModel(omdbMovieData);
            Movies.save();
            return omdbMovieData
        }
        if(Type == "series") {
            let Series = new SeriesModel(omdbMovieData);
            Series.save();
            return omdbMovieData
        }
        if(Type == "episode") {
            let Episodes = new EpisodeModel(omdbMovieData);
            Episodes.save();
            return omdbMovieData
        }
}

module.exports = {
    omdbMovie,
    typeData
}