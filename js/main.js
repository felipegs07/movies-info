$(document).ready(() => {
    $('#searchForm').on('submit',(e) => {
       
        let search = $('#searchQuery').val();
        getMovies(search);
        e.preventDefault();
    })
})

function getMovies(search){
    axios.get('http://www.omdbapi.com?s=' + search + '&apikey=thewdb')
    .then((response) => {
        let movies = response.data.Search;
        let output = '';
        $.each(movies,(index,movie) => {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a class="btn btn-primary" onclick="movieSelect('${movie.imdbID}')" href="#">Detalhes do Filme</a>
                    </div>
                </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelect(id){
    sessionStorage.setItem('movieID',id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieID');

    axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=thewdb')
    .then((response) => {
        console.log(response);
        let movie = response.data;
        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img class="thumbnail" src="${movie.Poster}">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Gênero: </strong>${movie.Genre}</li>
                        <li class="list-group-item"><strong>Lançamento: </strong>${movie.Released}</li>
                        <li class="list-group-item"><strong>Avaliação: </strong>${movie.Rated}</li>
                        <li class="list-group-item"><strong>Nota no IMDB: </strong>${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Diretor: </strong>${movie.Director}</li>
                        <li class="list-group-item"><strong>Roteiristas: </strong>${movie.Writer}</li>
                        <li class="list-group-item"><strong>Atores: </strong>${movie.Actors}</li>
                    </ul>

                </div>
            </div>
            s
            <div class="row">
                <div class="well">
                    <h3>História:</h3>
                    ${movie.Plot}
                    <hr>
                    <a class="btn btn-primary" href="http://imdb.com/title/${movie.imdbID}" target="_blank">Ver IMDB</a>
                    <a class="btn btn-default" href="index.html">Voltar para busca</a>
                </div>
            </div>
        `;
       
       $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}