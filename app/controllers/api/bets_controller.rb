class Api::BetsController < ApplicationController
  def create
    @bet = Bet.new(bet_params)

    if @bet.save
      render json: @bet
    else
      render json: @bet.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @bet = Bet.find(params[id])
    render json: @bet
  end

  def destroy
    @bet = Bet.find(params[id])
    @bet.destroy
  end

  private
  def bet_params
    params.require(:bet).permit(:user_id, :team_id, :match_id)
  end
end
