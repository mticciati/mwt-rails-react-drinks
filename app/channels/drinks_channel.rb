class DrinksChannel < ApplicationCable::Channel
  def subscribed
    stream_from "drinks"
  end

  # def follow_drink(data)
  #   # stop_all_streams
  #   # drink = Drink.find(params[:drink_id])
  #   drink = Drink.find(data['drink_id'].to_i)
  #   # stream_from "drinks:#{data['drink_id'].to_i}"
  #   # drink = Drink.find(params[:id])
  #   stream_for drink
  # end
end