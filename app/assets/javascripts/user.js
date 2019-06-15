$(function() {

  var search_list = $('#user-search-result');

  function buildHtml(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: ('keyword=' + input),
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(users){
      $('#user-search-result').empty();
      if(users.length !== 0 && input.length !== 0) {
        users.forEach(function(user) {
        buildHtml(user);
        });
      } else {
        appendErrMsgToHTML('一致するユーザーはいません');
      }



    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).on("click", ".chat-group-user__btn--add", function(){

    console.log(this)
    var name = $(this).data('userName');
    var id = $(this).data('userId');
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('#chat-group-users').append(html);  

    var par = $(this).parent();
    $(par).remove();
    

  

  });

  $(document).on('click', '.chat-group-user__btn--remove', function() {

    var par = $(this).parent();
    $(par).remove();
    
  });



});