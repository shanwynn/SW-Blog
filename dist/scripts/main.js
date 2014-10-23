var template = _.template($('.blog-posts').html());

var apiUrl = "https://tiny-pizza-server.herokuapp.com/collections/SW-Blog";

var BlogPost = function (attributes) {
    return _.extend({
      date: new Date(),
      title: 'title',
      post: 'post goes here'
    }, attributes);
};

$('input[type=submit]').on('click', function (event) {
  event.preventDefault();

  var fieldValues = $('input.field, textarea.field').serializeArray();

  var blogObject = new BlogPost();

  fieldValues.forEach(function (field) {
      blogObject[field.name] = field.value;
  });

  $.ajax({
      method: 'POST',
      url: apiUrl,
      data: blogObject
  }).done(function (data) {
    $('input.field, textarea.field').val(' ');
  });

});

var prevCount = 0;
setInterval(function () {
  $.ajax( {url: apiUrl} ).done(function (blogPosts) {
    if(blogPosts.length > prevCount) {
        prevCount = blogPosts.length;

        var finishedTemplates = _.map(blogPosts, function (post) {
          return template(new BlogPost(post));
        });

        $('.blog-output').html(finishedTemplates);
    }
  });
}, 1000);
