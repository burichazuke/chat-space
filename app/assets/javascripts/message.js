$(function() {

  function buildMessage(message){

    var content =  message.content ? `${message.content}`:``;
    var image = message.image ? `${message.image}`:``;
    var html =`<div class="message" data-id="${message.id}">
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
      console.log(html)

    })
    .fail(function() {
      alert("error");
    })
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message').last().data('id');
    console.log(last_message_id);
    
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "/groups/:group_id/api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function (messages) {
      console.log(messages)
      
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message) {
        insertHTML += buildMessage(message);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

      });
      //メッセージが入ったHTMLを取得
      
      //メッセージを追加
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    });
  };
  
  setInterval(reloadMessages, 5000);
});