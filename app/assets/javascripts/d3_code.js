function fetchByYear(year) {
  console.log('called');
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: 'movie/get_by_year?year=' + year,
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
      
      produceByYearChart(criticsScores, audienceScores, movieTitles);
    },
    error: function (result) {
      error();
    }
  });
}

function fetchAverages() {
  console.log('fetchAverages called');
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: 'movie/get_averages',
    dataType: 'json',
    success: function (data) {
      console.log(data)
    },
    error: function (result) {
      error();
    }
  });
}  

function fetchWinners() {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: 'movie/get_winners',
    dataType: 'json',
    success: function (data) {
      console.log(data)
    },
    error: function (result) {
      error();
    }
  });
}  
 

function produceByYearChart(cScores, aScores, titles) {
  var chart = c3.generate({
    bindto: '#byYearChart',
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

function error() {
    console.log("error")
}