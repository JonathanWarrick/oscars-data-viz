task :get_oscars_history => :environment do
	require 'rubygems'
	require 'nokogiri'
	require 'open-uri'

	# Link to Wikipedia page on Oscars
	url = "http://en.wikipedia.org/wiki/Academy_Award_for_Best_Picture"
	doc = Nokogiri::HTML(open(url))

	# Grab each table on Wiki page
	doc.css("table.wikitable").each do |year|
		# Grab year
		current_year = year.at_css("caption > big > a").text
		# Grab each movie from each table
		if current_year.to_i >= 1934
		  year.css("td:nth-child(1)").each_with_index do |movie, index|
				current_movie = movie.at_css("i > a").text
				Movie.create({
					title: current_movie,
					year: current_year,
					winner: index == 0 && current_year != 2014
				})
			end
		end
	end
end

task :get_movie_data => :environment do
	require 'rubygems'
	require 'rest_client'
	require 'json'

	movies_not_found = []
	rotten_tomatoes_api_key = ENV['ROTTEN_TOMATOES_API_KEY']
	binding.pry

	# Get array of movies from database
	Movie.find_each.with_index do |movie, index|
		if index % 5 == 0
			sleep(1.5.seconds)
		end
		# Get JSON from Rotten Tomatoes API
		response = RestClient.get "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=#{rotten_tomatoes_api_key}&q=#{movie.title.gsub(' ', '+')}"
		parsed_response = JSON.parse(response)

		matched = false

		# Loop through movies in JSON response to find correct movie from correct year
		parsed_response["movies"].each do |response|
			# If correct year, update with scores, etc.
			if [movie[:year], movie[:alt_year]].include? response["year"].to_s
			# if movie[:year] == response["year"].to_s || movie[:alt_year] == response["year"].to_s 
				movie.update({
					rotten_tomatoes_id: response["id"],
					critics_score: response["ratings"]["critics_score"],
					audience_score: response["ratings"]["audience_score"],
					rotten_tomatoes_link: response["links"]["alternate"]
				})
				matched = true
				break
			end
		end
		# If at the end and no update called, push title to separate array for manual input
		if !matched
			movies_not_found.push(movie[:title])
		end
	end
	puts movies_not_found
end
