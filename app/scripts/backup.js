/*var blogTemplate = _.template($('.blog-output-template').html());*/
$('.blog-posts').html( (_.template( $('.blog-post-area').html() ))(postObject) );
var apiUrl = "http://tiny-pizza-server.herokuapp.com/collections/SW-Blog";

  $('input[type=submit]').on('click', function (event) {
    event.preventDefault();

    console.log(blogPosts);

    $.ajax({
      method: 'POST',
      url: apiUrl,
      data: { title : 'Blog Title',
              post: 'Blog Post',
              sentAt: new Date()
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
