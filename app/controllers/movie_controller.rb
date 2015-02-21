class MovieController < ApplicationController

	def by_year
		@movies = Movie.all
		@years = (1934..2014).to_a.reverse!
	end

	def winners
	end

	def averages
	end

	def get_by_year
		year = params[:year]
    respond_to do |format|
      format.json {
				render json: Movie.where(:year => year).to_a
      }
    end
  end

  def get_averages
    respond_to do |format|
      format.json {
				render json: {
					:critics_scores => Movie.group(:year).average(:critics_score),
					:audience_scores => Movie.group(:year).average(:audience_score)
				}
      }
    end
  end

  def get_winners
		year = params[:year]
    respond_to do |format|
      format.json {
				render json: Movie.where(:winner => true).order(:year).to_a
      }
    end
  end
end
