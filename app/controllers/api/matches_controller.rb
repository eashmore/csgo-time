class Api::MatchesController < ApplicationController
  def index
    if params[:is_current]
      @matches = Match.includes(:bets).last
    else
      @matches = Match.includes(:winner, :teams, :bets, :items).all
    end
    render json: @matches
  end

  def create
    @match = Match.new(match_params)

    if @match.save
      render json: @match
    else
      render json: @match.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @match = Match.find(params[:id])

    render json: @match
  end

  def update
    @match = Match.find(params[:id])
    if @match.update(match_params)
      render json: @match
    else
      render json: @match.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def match_params
    params.require(:match).permit(:start_time, :current_round, :has_started,
                                  :map, :winner_id, :prize_pool, :is_current,
                                  :has_ended
                                 )
  end
end
