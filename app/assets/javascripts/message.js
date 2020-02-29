 $(function(){

   var buildPost = function(message) {
     if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message-data" data-message-id= ${message.id} > 
      <div class="message-data__name"> 
           <div class="user"> 
           ${message.user_name} 
         </div> 
          <div class="date"> 
          ${message.created_at}
          </div> 
        </div> 
    <div class="message-data__comment "> 
          <p class="lower-message__content"> 
          ${message.content}
         </p> 
         <img src="  ${message.image}  " class="lower-message__image" > 
        </div> 
      </div>`
    } else if (message.content) {
     //同様に、data-idが反映されるようにしている
      var html = `<div class="message-data" data-message-id=  ${message.id}  > 
         <div class="message-data__name"> 
         <div class="user"> 
         ${message.user_name}
          </div> 
          <div class="date"> 
          ${message.created_at} 
          </div> 
         </div> 
         <div class="message-data__comment "> 
          <p class="lower-message__content"> 
          ${message.content} 
         </p> 
       </div> 
      </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message-data" data-message-id=  ${message.id}  > 
        <div class="message-data__name"> 
          <div class="user> 
          ${message.user_name} 
           </div> 
          <div class="date"> 
            ${message.created_at} 
           </div> 
         </div> 
         <div class="message-data__comment "> 
           <img src="  ${message.image}  " class="lower-message__image" > 
        </div> 
      </div>`
     };
    return html;
   };

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
    var last_message_id = $('.message-data:last').data("message-id");
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
       insertHTML = buildPost(message)
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
     console.log("hello")
    setInterval(reloadMessages, 3000);
  }
 });

     