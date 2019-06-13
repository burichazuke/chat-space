$(function() {
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
          console.log(user.name)
        });
      }
    })
    .fail(function() {

    })
  })
});