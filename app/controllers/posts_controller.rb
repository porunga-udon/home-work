class PostsController < ApplicationController

  def index
    @post = Post.new
    @posts = Post.all
  end
  
  def create
    @post = Post.create(post_params)
    if @post.save
      respond_to do |format|
        format.json
      end
    else
      render :index
    end
  end

  private
  def post_params
    params.require(:post).permit(:content).merge(user_id: current_user.id)
  end

end