var blogTemplate = _.template($('.blog-posts').html());
var postCountTemplate = _.template($('.user-sidebar-template').html());

var apiUrl = "http://tiny-pizza-server.herokuapp.com/collections/SW-Blog";
var blogObject = {};

  $('input[type=submit]').on('click', function (event) {
    event.preventDefault();

var title =  $('input.field').serializeArray();
var post =  $('textarea.field').serializeArray();
var date = new Date ();
    blogObject['date'] = date;

    title.forEach(function (title) {
      blogObject[title.name] = title.value;
    });

    post.forEach(function (post) {
      blogObject[post.name] = post.value;
    });

    $.ajax({
      method: 'POST',
      url: apiUrl,
      data: blogObject
    }).done(function (data) {$('input.field').val('');
    });
  });

    $.ajax( {url: apiUrl} ).done(function (posts) {

    });


/*  setInterval(function () {
    $.ajax( {url: apiUrl} ).done(function (blogPosts) {
      if(blogPosts.length > prevCount) {
        console.log(blogPosts);
        prevCount = blogPosts.length;
*/
    var finishedTemplates = _.map(posts, function (post) {
      return blogTemplate(post);
    });

    $('.post-output').html(finishedTemplates);
  });
}, 1000);
});
