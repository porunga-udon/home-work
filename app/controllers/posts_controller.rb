class PostsController < ApplicationController

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

end