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
    @bet = Bet.find(params[:id])
    render json: @bet
  end

  def update
    @bet = Bet.find(params[:id])

    if @bet.update(bet_params)
      render json: @bet
    else
      render json: @bet.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @bet = Bet.find(params[:id])
    @bet.destroy

    render json: []
  end

  private

  def bet_params
    params.require(:bet).permit(:total_value, :user_id, :team_id, :match_id)
  end
end
