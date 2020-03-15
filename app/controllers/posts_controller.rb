class PostsController < ApplicationController
  before_action :move_to_index , except: [:index]

  def index
    @post = Post.new
    @posts = Post.all
  end

  def create
    @post = Post.create(post_params)
    redirect_to root_path
  end

  private

  def post_params
    params.require(:post).permit(:content).merge(user_id: current_user.id)
  end

  def move_to_index
    redirect_to action: :index unless user_signed_in?
  end

end