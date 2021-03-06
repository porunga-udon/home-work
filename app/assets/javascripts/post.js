$(function(){

  function buildHTML(post){
    var html = `
                <div class="main__content__message">
                  <div class="main__content__message__text">
                    ${post.content}
                  </div>
                  <div class="main__content__message__index">
                    <div class="main__content__message__index__name">
                      ${post.user_name}
                    </div>
                    <div class="main__content__message__index__date">
                      ${post.created_at}
                    </div>
                  </div>
                </div>`
    return html;
  }
                        
  $('#new_post').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $('#new_post').attr('action');
    $(this).blur() ;
    if($("#modal-overlay")[0]) return false ;
    $('.modal').fadeIn("slow");
    $(".modal-overlay").fadeIn("slow");
    $('.modal-btn__yes').click(function(){
      // $('.modal').fadeOut("slow");
      // $(".modal-overlay").fadeOut("slow");
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.main__content').append(html);
        $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight});
        $('.form__send').prop('disabled',false);
        $('#new_post')[0].reset();
      })
      .fail(function(){
        alert("投稿できませんでした")
        $('.form__send').prop('disabled',false);
      })
    })
    $('.modal-btn__no').click(function(){
      $('.modal').fadeOut("slow");
      $('.modal-overlay').fadeOut("slow");
      $('.form__send').prop('disabled',false);
    })
  })

  $(".main__content__message").mouseover(function(){
    $(this).stop().animate({ 
      color: "white",
      backgroundColor: "#97D1E4"
    },500)
  })

  $(".main__content__message").mouseleave(function(){
    $(this).stop().animate({
      color: "black",
      backgroundColor: "white"
    },1000);
  })

});
