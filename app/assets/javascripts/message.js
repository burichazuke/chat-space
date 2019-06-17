$(function() {

  function buildMessage(message){

    var content =  message.content ? `${message.content}`:``;
    var image = message.image ? `${message.image}`:``;
    var html =`<div class="message" data-id="${message.id}" data-group-id="${message.group_id}">
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
                <img src="${image}">
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
    .done(function(message) {
      var html = buildMessage(message);
      $('.messages').append(html);     
      $('#send').attr('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert("error");
      $('#send').attr('disabled', false);
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.message').last().data('id');
    var message_group_id = $('.message').last().data('group-id')
    
    $.ajax({
      url: `/groups/${message_group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function (messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        insertHTML += buildMessage(message);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
      $('.messages').append(insertHTML);
    })

    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  var reg = location.href.match(/\/groups\/\d+\/messages/)
  if(reg !== null) {
    setInterval(reloadMessages, 2000);
  }
  
});