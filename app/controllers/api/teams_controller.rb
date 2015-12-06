class Api::TeamsController < ApplicationController
  def index
    @teams = Team.includes(:bets, :matches).all

    render json: @teams
  end

  def create
    @team = Team.new(team_params)
    if @team.save
      render json: @team
    else
      render json: @team.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @team = Team.find(params[:id])
    render json: @team
  end

  def update
    @team = Team.find(params[:id])
    if @team.update(team_params)
      render json: @team
    else
      render json: @team.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def team_params
    params.require(:team).permit(:name, :odds, :rounds_won, :avatar_url)
  end
end
