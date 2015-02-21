Rails.application.routes.draw do
  
  root 'movie#home'

  get 'by_year' => 'movie#by_year'
  get 'winners' => 'movie#winners'
  get 'averages' => 'movie#averages'
  get 'winners_vs_averages' => 'movie#winners_vs_averages'

  get 'movie/get_by_year', :defaults => { :format => 'json' }
  get 'movie/get_averages', :defaults => { :format => 'json' }
  get 'movie/get_winners', :defaults => { :format => 'json' } 
  get 'movie/get_winners_vs_averages', :defaults => { :format => 'json' } 
  
end
