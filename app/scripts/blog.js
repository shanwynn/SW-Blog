var apiUrl = "http://tiny-pizza-server.herokuapp.com/collections/SW-Blog";

var Post = function (blogPost) {
  var defaults = {
    id: new Date().getTime(),
    title: 'none',
    post: 'none',
    sentAt: new Date()
  };
  return {

    template: _.template($('.blog-posts').html()),

    data: _.extend(defaults, blogPost),

    html: function () { return this.template(this.data); },

    save: function (doneCallback) {
      $.ajax({
        method: "POST",
        url: apiUrl,
        data: { 'title' : 'blog title', post: 'blog goes here', sentAt: new Date() }
      }).done(doneCallback);
    }
  };
};

app = (function($) {
  var title = '';
  var post = '';

  var blogCountTemplate = _.template($('.blog-posts').html());

  var onSend = function () {
    var post = new Post ({
      post: $('.send').val(),
      title: $('.blog-title').val()
    });
  };

  var addedPosts = function () {
    var compiledTemplates = _.map(_.values(postData), function (blogPost) {
      var post = new Post(blogPost);
      return post.html();
    });
    $('.blog-output').html(compiledTempates);
  };

  setInterval(function() {
    addedPosts();
  }, 1000);
  $('.blog-post-area input[type=submit]').on('click', onSend);
})($);
