$('.container').on('click', function(){
    
})

//displays the comments
$(document).on('click', '.toggle-comments', function(){
    var toggle = $(this).parent().find('.toggle-display');
    var text = $(this).text();
    if(text == "Display Comments") {
        toggle.show();
        $(this).text('Hide Comments');
    } else if(text == 'Hide Comments') {
        toggle.hide();
        $(this).text('Display Comments');
    }
    console.log(); //article title
    
})
// when you click on the button as ADD COMMENT
$(document).on('click', '.add-comment', function(){ 
    //goes to form to add a comment the comments
    // <button class="add-comment">Add a Comment</button>
    var addButton = $(this);
    addButton.text('Post Comment');
    var commentForm = $(`<form class="comment-form" method="post" action="/post-comment"><input type="hidden" value='${title}' name='title'><input type="text" name="comment" placeholder="comment"><input type="text" name="username" placeholder="username"><input type="submit" class="post-comment" placeholder="Post Comment">`);
    addButton.before(commentForm);
    addButton.hide();
    var title = $(this).parent().find('h3').text();
    // title.attr('name', 'title');
    console.log(title)
    debugger;
    
   })
//  PROBABLY DON'T NEED THIS ANYMORE BECAUSE IT REFRESHES THE PAGE ONCE YOU POST A COMMENT
// when you click on the butoon as POST COMMENT
// $(document).on('click', '.post-comment', function(){
//     console.log($('input [value="comment"]')).val();
// //     $(this).text('Add Comment');
// //     $(this).removeClass('post-comment').addClass('add-comment');
// //     var toggle = $(this).parent().find('.comment-form');
// //     toggle.hide();
// })