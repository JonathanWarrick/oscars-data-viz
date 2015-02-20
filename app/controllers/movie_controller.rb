class MovieController < ApplicationController
	def show
		@movies = Movie.all
		@years = (1934..2014).to_a.reverse!
	end

	def show_year
		year = params[:year]
		render json: Movie.where(:year => year).to_a
	end

	def show_winners
		render json: Movie.where(:winner => true).order(:year).to_a
	end

	def data
		year = params[:year]
    respond_to do |format|
      format.json {
				render json: Movie.where(:year => year).to_a
      }
    end
  end
end
