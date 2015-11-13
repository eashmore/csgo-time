class Api::MatchesController < ApplicationController
  def index
    @nextMatch = Match.all.last
    render json: @nextMatch
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
    params.require(:match).permit(:start_time, :current_round, :has_started)
  end
end