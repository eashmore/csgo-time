class Api::MatchesController < ApplicationController
  def index
    @matches = Match.all

    render json: @matches
  end

  def new
    @match = Match.new
  end

  def create
    @match = Match.new(match_params)

    @match.save
  end

  private
  def match_params
    params.require(:match).permit(:start_time, :current_round, :has_started)
  end
end
