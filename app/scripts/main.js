var blogTemplate = _.template($('.blog-posts').html());

var apiUrl = "http://tiny-pizza-server.herokuapp.com/collections/SW-Blog";

  $('input[type=submit]').on('click', function (event) {
    event.preventDefault();

var title =  $('input.field').serializeArray();
var post =  $('textarea.blog').serializeArray();
var date = new Date ();
    blogObject['date'] = date;

var blogObject = {};

    title.forEach(function (field) {
      blogObject[field.name] = field.value;
    });

    post.forEach(function (blog) {
      blogObject[blog.name] = blog.value;
    });

    $.ajax({
      method: 'POST',
      url: apiUrl,
      data: blogObject
    }).done(function (data) {$('input.field').val(' ');
    });
  });

  var previousCount = 0;

  setInterval(function () {
    $.ajax( {url: apiUrl} ).done(function (blogPosts) {
      if(blogPosts.length > prevCount) {
        prevCount = blogPosts.length;

    var finishedTemplates = _.map(blogPosts, function (post) {
      return blogTemplate(post);
    });

    $('.post-output').html(finishedTemplates);
  });
}, 1000);
});
