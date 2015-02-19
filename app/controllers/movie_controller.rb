class MovieController < ApplicationController
	def show
		@movies = Movie.all
	end

	def show_year
		year = params[:year]
		render json: Movie.where(:year => year).to_a
	end
end
