var blogTemplate = _.template($('.blog-posts').html());
var postCountTemplate = _.template($('.user-sidebar-template').html());

var apiUrl = "http://tiny-pizza-server.herokuapp.com/collections/SW-Blog";
var blogObject = {};

  $('input[type=submit]').on('click', function (event) {
    event.preventDefault();

    console.log(blogPosts);

    $.ajax({
      method: 'POST',
      url: apiUrl,
      data: { title : 'Blog Title',
              post: 'Blog Post',
              date: new Date()
              }
    }).done(function (data) {
      $('input.field').val('');
    });
  });

  var prevCount = 0;

  setInterval(function () {
    $.ajax( {url: apiUrl} ).done(function (blogPosts) {
      if(blogPosts.length > prevCount) {
        console.log(blogPosts);
        prevCount = blogPosts.length;

        var finishedTemplates = _.map(blogPosts, function (post) {
          return blogTemplate(post);
        });

        $('.post-output').html(finishedTemplates);
      }
    });
  }, 1000);
