class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where("id > ?", params[:id]).where(group_id: params[:group_id])
    respond_to do |format|
      format.html
      format.json
    end
  end
end