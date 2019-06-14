$(function() {

  var search_list = $('#user-search-result');

  function buildHtml(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
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
    console.log(input);
    
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
      if(users.length !== 0) {
        users.forEach(function(user) {
          buildHtml(user)
        });
      } else {
        appendErrMsgToHTML('一致するユーザーはいません');
      }

    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  })
});