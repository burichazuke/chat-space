$(function() {

  function buildMessage(message){
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
                  ${message.content}
                </p>
              </div>`
    return html;
  }


    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.message').val('');
    })
    .fail(function() {
      alert("error");
    })
  })
});