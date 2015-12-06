class Api::ItemsController < ApplicationController
  def index
    if params[:bet_id]
      @items = Item.includes(:user, :bet).bet_items(params[:bet_id])
    else
      @items = Item.includes(:user, :bet).all
    end

    render json: @items
  end

  def create
    @item = Item.new(item_params)

    if @item.save
      render json: @item
    else
      render json: @item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @item = Item.find(params[:id])

    render json: @item
  end

  def update
    @item = Item.find(params[:id])
    if @item.update(item_params)
      render json: @item
    else
      render json: @item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    render json: @item
  end

  private

  def item_params
    params.require(:item).permit(:name, :price, :gun_type, :condition, :rarity,
                                 :is_stattrack, :is_souvenir, :image_url,
                                 :user_id, :bet_id
                                )
  end
end
