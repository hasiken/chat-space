$(function(){
  function buildPost(message){
    if ( message.image ) {
     var html= 
     `<div class="message" >
       <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.created_at}
       </div>
     </div>
     <div class="lower-message">
       <p class="lower-message__content">
         ${message.content}
       </p>
    </div>
    <img src=${message.image} >
  </div>`
  return html;
} else {
  var html =
   `<div class="message" >
     <div class="upper-message">
      <div class="upper-message__user-name">
        ${message.user_name}
      </div>
      <div class="upper-message__date">
       ${message.created_at}
      </div>
    </div>
    <div class="lower-message">
      <p class="lower-message__content">
       ${message.content}
      </p>
       </div>
     </div>`
   return html;
  };
 }
  
$('#new_message').on('submit', function(e){
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
     .done(function(post){
       var html = buildPost(post)
       $('.chat-main__massage-list').append(html);  
       $('.chat-main__massage-list').animate({ scrollTop: $('.chat-main__massage-list')[0].scrollHeight});  
       $('.send-box').prop('disabled', false)
       $('form')[0].reset();
     })
   });
   var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
     var insertHTML = '';
     $.each(messages, function(i, message) {
       insertHTML += buildPost(message)
     });
     $('.chat-main__massage-list').append(insertHTML);
     $('.chat-main__massage-list').animate({ scrollTop: $('.chat-main__massage-list')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
  }
   if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
 });

     