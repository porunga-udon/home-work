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
      $('#new_post')[0].reset();
      $('.form__send').prop('disabled',false);
    })
    .fail(function(){
      alert("投稿できませんでした")
      $('.form__send').prop('disabled',false);
    })
  })

  $(".main__content__message").mouseover(function(){
    $(this).animate({ 
      color: "white",
      backgroundColor: "#97D1E4"
    })
  })

  $(".main__content__message").mouseleave(function(){
    $(this).animate({
      color: "black",
      backgroundColor: "white"
    });
  })
});