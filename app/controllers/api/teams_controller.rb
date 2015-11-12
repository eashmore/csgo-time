class Api::TeamsController < ApplicationController
  def index
    @teams = Team.all

    render json: @teams
  end

  def new
    @team = Team.new
  end

  def create
    @team = Team.new(team_params)
    @team.save
  end

  private
  def team_params
    params.require(:team).permit(:name, :odds, :avatar)
  end
end
