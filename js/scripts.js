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

          const article = $('.post');

          const contentAndTitle = `<div class="entry-content">
          ${quoteParagraph}
          </div>
          <div class="entry-meta">
          <h2 class="entry-title">&mdash; ${author}
          </h2>`;

          if (source && sourceUrl) {
            article.html(
              contentAndTitle +
                `<span class="source">, <a href="${sourceUrl}"> ${source}</a>
              </span></div>`
            );
          } else if (source) {
            article.html(
              contentAndTitle +
                `<span class="source">, ${source}
                </span></div>`
            );
          } else {
            article.html(
              contentAndTitle +
                `<span class="source">
                </span></div>` //end of .entry-meta class
            );
          }
        })
        .fail(function() {
          article.html(
            `<p class=".entry-meta"> Failed to load quote, please try again</p>`
          );
        });

      $(window).on('popstate', function(event) {
        window.location = lastPage;
      });
    } //end of getRandomQuote

    function postQuote(event) {
      event.preventDefault();

      const quoteAuthor = $('#quote-author').val();
      const quoteContent = $('#quote-content').val();
      const quoteSource = $('#quote-source').val();
      const quoteSourceUrl = $('#quote-source-url').val();

      if (quoteAuthor !== '' && quoteContent !== '') {
        postAjax();
      } else if (quoteContent !== '') {
        alert('please add author');
      } else if (quoteAuthor !== '') {
        alert('please add quote');
      } else {
        alert('please add quote & author');
      }

      function postAjax() {
        $.ajax({
          method: 'post',
          url: api_vars.rest_url + 'wp/v2/posts',
          data: {
            title: quoteAuthor,
            content: quoteContent,
            post_status: 'pending',
            _qod_quote_source: quoteSource,
            _qod_source_url: quoteSourceUrl
          },
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
          }
        })
          .done(function() {
            const formTitle = $('.entry-title');
            formTitle.append(`<p>&mdash; Your quote has been submitted</p>`);
            $('#quote-submission-form').slideUp(500);
          })
          .fail(function() {
            formTitle.append(
              `<p>&mdash; Quote not submitted, please try again</p>`
            );
          });
      } //end of postAjax
    } // end of postQuote
  }); // end of doc ready
})(jQuery);
