class Drink < ApplicationRecord
  has_many :ingredients

  after_commit { DrinkBroadcastJob.perform_later(self)}
end
