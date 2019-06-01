(function($) {
  $(function() {
    let lastPage = '';

    $('#new-quote-button').on('click', getRandomQuote);
    $('#quote-submission-form').on('submit', postQuote);

    function getRandomQuote(event) {
      event.preventDefault();

      lastPage = document.URL;
      $('.post').html('');
      $.ajax({
        method: 'get',
        url:
          api_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
          const randomQuote = data[0];
          history.pushState(null, null, randomQuote.slug);

          console.log(randomQuote);
          const quoteParagraph = randomQuote.excerpt.rendered;
          const author = randomQuote.title.rendered;
          const source = randomQuote._qod_quote_source;
          const sourceUrl = randomQuote._qod_quote_source_url;
          $('.post').append(
            '<div class="entry-content">' + quoteParagraph + '</div>'
             '<div class="entry-meta">,<h2 class="entry-title">' + author + '</h2>'
            '<span class="source">' + if (sourceUrl !== '')
            {+ '<a href="'+sourceUrl+'">' + source + '</a>'
          +}else{+
            '<p>'+ source +'</p>' 
          +}+'</span></div>');
        })
        .fail(function(error) {
          console.log(error);
          // TODO append a message telling the user something went wrong
        });

      $(window).on('popstate', function() {
        window.location.append(lastPage);
      });
    } //end of getRandomQuote

    function postQuote(event) {
      event.preventDefault();

      const quoteAuthor = $('#quote-author').val();

      if (quoteAuthor !== '') {
        postAjax();
      } else {
        console.log('no value set'); //TODO
      }

      function postAjax() {
        $.ajax({
          method: 'post',
          url: api_vars.rest_url + 'wp/v2/posts',
          data: {
            // TODO use the form input .val() for the title, content
            title: 'quoteAuthor',
            content: 'The most amazing quote', //TODO make dynamic
            post_status: 'pending'
            // _qod_quote_source: TODO
            // _qod_source_url: TODO
          },
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
          }
        })
          .done(function() {
            console.log('great success');
            // done function
            $('#quote-submission-form').slideUp(500);
          })
          .fail(function() {
            console.log('not successful');
            // fail function
          });
      } //end of postAjax
    } // end of postQuote
  }); // end of doc ready
})(jQuery);
