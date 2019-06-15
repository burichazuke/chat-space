$(function() {

  function buildMessage(message){

    var content =  message.content ? `${message.content}`:``;
    var image = message.image ? `${message.image}`:``;
    var html =`<div class="message">
                <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                    ${message.user_name}
                  </p>
                  <p class="message__upper-info__date">
                    ${message.created_at}
                  </p>
                </div>
                <p class="message__text">
                  ${content}
                </p>
                <img src=${image}>
              </div>`
    return html;
  }

  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');



    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildMessage(data);
      $('.messages').append(html);     
      $('#send').attr('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert("error");
    })
  })
});