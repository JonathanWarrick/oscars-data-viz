function fetchData(year) {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: 'movie/data?year=' + year,
    dataType: 'json',
    success: function (data) {
      criticsScores = ["Critics"];
      audienceScores = ["Audience"];
      movieTitles = ['titles'];
      
      data.forEach(function(movie) {
        criticsScores.push(movie.critics_score);
        audienceScores.push(movie.audience_score);
        movieTitles.push(movie.title);
      });
      
      produceChart(criticsScores, audienceScores, movieTitles);
    },
    error: function (result) {
      error();
    }
  });
}  
 
function error() {
    console.log("error")
}

function produceChart(cScores, aScores, titles) {
  var chart = c3.generate({
    bindto: '#chart',
    // remove tooltip for now
    interaction: {
      enabled: false
    },
    // default transition to 500ms
    transition: {
      duration: 1200
    },
    data: {
      x: 'titles',
      columns: [titles, cScores, aScores],
      type: 'bar'
    },
    axis: {
      x: {
        type: 'category' // this needed to load string x value
      }
    }
  });
}

fetchData("2014");

$(function(){
  $('select').change( function() {
    fetchData($('option:selected',this).val());
  });
});