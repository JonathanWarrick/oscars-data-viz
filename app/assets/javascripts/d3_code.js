function fetchByYear(year) {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: 'movie/get_by_year?year=' + year,
    dataType: 'json',
    success: function (data) {
      var criticsScores = ["Critics"];
      var audienceScores = ["Audience"];
      var movieTitles = ['titles'];
      var winnerIndex;
      
      data.forEach(function(movie, index) {
        criticsScores.push(movie.critics_score);
        audienceScores.push(movie.audience_score);
        movieTitles.push(movie.title);
        if (movie.winner) {
          winnerIndex = index;
        }
      });
      
      produceByYearChart(criticsScores, audienceScores, movieTitles, winnerIndex, year);
      if (year !== "2014") {
        setTimeout(function() {
          var selection = '.c3-bar-' + winnerIndex;
          d3.select('.c3-bars-Critics').select(selection).style("fill", "yellow");
          d3.select('.c3-bars-Audience').select(selection).style("fill", "red");
        }, 1000)
      }
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
      var criticsScores = ["Critics"];
      var audienceScores = ["Audience"];
      var movieYears = ['years'];

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
      var criticsScores = ["Critics"];
      var audienceScores = ["Audience"];
      var movieYears = ['years'];
      
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

function fetchWinnersVsAverages() {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: 'movie/get_winners_vs_averages',
    dataType: 'json',
    success: function (data) {
      var criticsScores = ["Critics"];
      var audienceScores = ["Audience"];
      var winnerCriticsScores = ["Winners Critics"];
      var winnerAudienceScores = ["Winners Audience"]
      var movieYears = ['years'];

      for(var i = 1934; i <= 2014; i++) {
        movieYears.push('' + i + '-01-01');
        criticsScores.push(data.critics_scores[i.toString()]);
        audienceScores.push(data.audience_scores[i.toString()]);
        winnerCriticsScores.push(data.winner_critics_scores[i.toString()]);
        winnerAudienceScores.push(data.winner_audience_scores[i.toString()]);
      }

      produceWinnerVsAveragesChart(criticsScores, audienceScores, winnerCriticsScores, winnerAudienceScores, movieYears);
    },
    error: function (result) {
      error();
    }
  });
}

function produceByYearChart(cScores, aScores, titles, winnerIndex, year) {
  var chart = c3.generate({
    bindto: '#byYearChart',
    // remove tooltip for now
    interaction: {
      enabled: false
    },
    // default transition to 500ms
    transition: {
      // duration: 1200
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
          format: '%Y',
          values: [
            '1934-01-01', 
            '1940-01-01',
            '1950-01-01',
            '1960-01-01',
            '1970-01-01',
            '1980-01-01',
            '1990-01-01',
            '2000-01-01',
            '2010-01-01',
            '2014-01-01'
          ]
        }
      },
      y: {
        tick: {
          values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        }
      }
    }
  });
}

function produceWinnerVsAveragesChart(cScores, aScores, wcScores, waScores, years) {
  var chart = c3.generate({
    bindto: '#winnersVsAveragesChart',
    // remove tooltip for now
    interaction: {
      enabled: false
    },
    data: {
      x: 'years',
      columns: [years, cScores, aScores, wcScores, waScores]
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