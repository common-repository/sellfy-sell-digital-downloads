jQuery(document).ready(function ($) {
    $('#sellfy_create_page').on('submit', function () {
        var data = $(this).serialize(),
            _this = this,
            error = $('#sellfy_store_error_message');
        error.fadeOut();
        $.post(ajaxurl, data, function (response) {
            if (response && response.success) {
                error.removeClass('error updated created')
                    .addClass('updated')
                    .fadeIn()
                    .find('a').attr('href', response.page_url);
                $(_this).find('#submit_holder').removeClass().addClass('update-page');
                if (response.is_new) {
                    error.addClass('created');
                }
            }
            else {
                error.removeClass('updated')
                     .addClass('error')
                     .show()
                     .children('.error-text')
                     .text(response.error);
            }
        });
        return false;
    });
    $('#sellfy_delete_page').on('click', function () {
        var confirmed = confirm('Are you really want to remove your Sellfy store page?');
        if (confirmed) {
            var data = {
                action: 'sellfy_delete_store',
                security: $('#sellfy_security').val()
            };
            $.post(ajaxurl, data, function (response) {
                if (response && response.success) {
                    document.location.reload(true);
                }
                else {
                    alert('Unfortunately, I can\'t find the store page. The page now would be reloaded');
                    document.location.reload(true);
                }
            });
        }
    });
});
