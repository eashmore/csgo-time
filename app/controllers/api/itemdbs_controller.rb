class Api::ItemdbsController < ApplicationController
  def index
    @itemDbs = Itemdb.all

    render json: @itemDbs
  end

  def create
    @item = Itemdb.new(item_params)

    if @item.save
      render json: @item
    else
      render json: @item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @item = Itemdb.find(params[:id])
    render json: @item
  end
end
