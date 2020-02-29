 $(function(){
   function buildPost(message){
    if ( message.image ) {
     var html= 
     `<div class="message-data" >
       <div class="message-data__name">
        <div class="user">
          ${message.user_name}
        </div>
        <div class="date">
          ${message.created_at}
       </div>
     </div>
     <div class="message-data__comment">
       <p class="message-data__comment--list">
         ${message.content}
       </p>
    </div>
    <img src=${message.image} >
  </div>`
  return html;
} else {
  var html =
   `<div class="message-data" >
     <div class="message-data__name">
      <div class="user">
        ${message.user_name}
      </div>
      <div class="date">
       ${message.created_at}
      </div>
    </div>
    <div class="message-data__comment">
      <p class="message-data__comment--list">
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
       $('.message-data').append(html);  
       $('.message-data').animate({ scrollTop: $('.chat-main__massage-list')[0].scrollHeight});  
       $('.send-box').prop('disabled', false)
       $('form')[0].reset();
     })

   });

 });