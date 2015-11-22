class UsersController < ApplicationController

  def index
    @users = User.includes(:bets).includes(:items).all

    render json: @users
  end

  def new
    @user = User.new

    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])

    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
