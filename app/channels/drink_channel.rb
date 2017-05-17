class DrinkChannel < ApplicationCable::Channel
  def subscribed
    drink = Drink.find(params[:id])
    stream_for drink
  end
end