class Api::MessagesController < ApplicationController
    def index
      group = Group.find(params[:group_id])
      # ajaxで送られてくる最後のメッセージのid番号を変数に代入
      last_message_id = params[:id].to_i
     
      @messages = group.messages.includes(:user).where("id > ?", last_message_id)
    end
  
end