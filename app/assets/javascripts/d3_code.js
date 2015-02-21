function fetchByYear(year) {
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
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: 'movie/get_averages',
    dataType: 'json',
    success: function (data) {
      criticsScores = ["Critics"];
      audienceScores = ["Audience"];
      movieYears = ['years'];

      for(var i = 1934; i <= 2014; i++) {
        movieYears.push('' + i + '-01-01');
        criticsScores.push(data.critics_scores[i.toString()]);
        audienceScores.push(data.audience_scores[i.toString()]);
      }

      produceAveragesChart(criticsScores, audienceScores, movieYears);
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
      criticsScores = ["Critics"];
      audienceScores = ["Audience"];
      movieYears = ['years'];
      
      data.forEach(function(movie) {
        criticsScores.push(movie.critics_score);
        audienceScores.push(movie.audience_score);
        movieYears.push(movie.year + '-01-01');
      });
      
      produceWinnersChart(criticsScores, audienceScores, movieYears);
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

function produceAveragesChart(cScores, aScores, years) {
  var chart = c3.generate({
    bindto: '#averagesChart',
    // remove tooltip for now
    interaction: {
      enabled: false
    },
    data: {
      x: 'years',
      columns: [years, cScores, aScores]
    }, 
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y'
        }
      }
    }
  });
}

function produceWinnersChart(cScores, aScores, years) {
  var chart = c3.generate({
    bindto: '#winnersChart',
    // remove tooltip for now
    interaction: {
      enabled: false
    },
    data: {
      x: 'years',
      columns: [years, cScores, aScores]
    }, 
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y'
        }
      }
    }
  });
}

function error() {
    console.log("error")
}