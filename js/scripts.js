(function($) {
  $('#toggle-status').on('click', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'post',
      url: api_vars.rest_url + 'wp/v2/posts/' + api_vars.post_id,
      data: {
        post_status: 'draft'
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
      }
    }).done(function(response) {
      alert('Success! Status changed');
    });
  });
})(jQuery);
