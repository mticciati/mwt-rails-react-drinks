class DrinkBroadcastJob < ApplicationJob
  queue_as :default

  def perform(drink)
    ActionCable.server.broadcast "drinks", {
      drink: drink.id
    }
  end
end
