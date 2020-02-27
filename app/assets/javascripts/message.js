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
       $('.messages').append(html);  
       $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});  
       $('.send-box').prop('disabled', false)
       $('form')[0].reset();
     })

   });

 });