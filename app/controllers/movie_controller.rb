class MovieController < ApplicationController
	def show
		@movies = Movie.all
	end
end
