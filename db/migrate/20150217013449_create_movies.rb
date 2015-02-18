class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.integer :rotten_tomatoes_id
      t.string :title
      t.string :year
      t.integer :critics_score
      t.integer :audience_score
      t.text :rotten_tomatoes_link
      t.boolean :winner

      t.timestamps null: false
    end
  end
end
