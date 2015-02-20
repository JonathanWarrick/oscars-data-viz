function fetchData(year) {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: 'movie/data?year=' + year,
    dataType: 'json',
    success: function (data) {
      criticsScores = ["Critics' Scores"];
      audienceScores = ["Audience's Scores"];
      movieTitles = ['x'];
      
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
    data: {
      columns: [cScores, aScores],
      type: 'bar'
    },
    bar: {
      width: {
        ratio: 0.5 // this makes bar width 50% of length between ticks
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