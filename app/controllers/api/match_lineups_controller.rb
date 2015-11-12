class Api::MatchLineupsController < ApplicationController
  def create
    @lineup = MatchLineup.new(match_lineup_params)

    if @linup.save
      render json: @lineup
    else
      render json: @lineup.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def match_lineup_params
    params.require(:match_lineup).permit(:team_id, :match_id)
  end
end
