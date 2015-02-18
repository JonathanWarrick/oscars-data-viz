class AddAltFieldsToMovies < ActiveRecord::Migration
  def change
    add_column :movies, :alt_year, :string
    add_column :movies, :alt_title, :string
  end
end
