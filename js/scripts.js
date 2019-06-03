(function($) {
  $(function() {
    let lastPage = '';

    $('#new-quote-button').on('click', getRandomQuote);
    $('#quote-submission-form').on('submit', postQuote);

    function getRandomQuote(event) {
      event.preventDefault();
      lastPage = document.URL;
      $.ajax({
        method: 'get',
        url:
          api_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
          const randomQuote = data[0];
          history.pushState(null, null, randomQuote.slug);

          const quoteParagraph = randomQuote.excerpt.rendered;
          const author = randomQuote.title.rendered;
          const source = randomQuote._qod_quote_source;
          const sourceUrl = randomQuote._qod_quote_source_url;

          const contentAndTitle = `<div class="entry-content">
          ${quoteParagraph}
          </div>
          <div class="entry-meta">
          <h2 class="entry-title">&mdash; ${author}
          </h2>`;

          if (source && sourceUrl) {
            $('.post').html(
              contentAndTitle +
                `<span class="source">, <a href="${sourceUrl}"> ${source}</a>
              </span></div>`
            );
          } else if (source) {
            $('.post').html(
              contentAndTitle +
                `<span class="source">, ${source}
                </span></div>`
            );
          } else {
            $('.post').html(
              contentAndTitle +
                `<span class="source">
                </span></div>` //end of .entry-meta class
            );
          }
        })
        .fail(function() {
          $('.post').html(
            `<p class=".entry-meta"> Failed to load quote, please try again</p>`
          );
        });

      $(window).on('popstate', function(event) {
        window.location.reload(lastPage);
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
