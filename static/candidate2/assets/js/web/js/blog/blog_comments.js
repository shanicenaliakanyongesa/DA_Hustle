document.addEventListener('turbo:load', loadFrontBlogComments)

function loadFrontBlogComments () {
    window.scrollTo(0, 0);
}

listenSubmit('#commentForm', function (event) {
    event.preventDefault();
    processingBtn('#commentForm', '#submitBtn', 'loading');

    if ($('.comment-id').val() === '') {
        addComment();
    } else {
        updateComment();
    }
});

listenClick('.delete-comment-btn', function (event) {
    event.preventDefault();
    let deleteId = $(this).data('id');
    let deletedCommentBtn = $(this);
    swal({
        title: Lang.get('js.delete') + ' !',
        text: Lang.get('js.are_you_sure_want_to_delete') + ' ' + '"' + Lang.get('js.comment') + '" ?',
        type: 'warning',
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        showCancelButton: true,
        confirmButtonText: Lang.get('js.ok'),
        cancelButtonText: Lang.get('js.cancel'),
        confirmButtonColor: '#1967d2',
        cancelButtonColor: '#d33',
    }, function (isConfirmed) {
        if (isConfirmed) {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                },
            });
            $.ajax({
                type: 'DELETE',
                url: route('blog.delete.comment', deleteId),
                success: function (result) {
                    let commentCount = $('.comments').find('.comment-card').length - 1;
                    deletedCommentBtn.closest('.comment-card').remove();
                    $('.comment-count').text('(0)');
                    if ($('.comments').find('.comment-card').length !== 0) {
                        $('.comment-count').text('(' + commentCount + ')');
                    } else {
                        postComment();
                    }
                    swal({
                        title: Lang.get('js.deleted') + ' !',
                        text: Lang.get('js.comment') + ' ' +
                            Lang.get('js.has_been_deleted'),
                        confirmButtonText: Lang.get('js.ok'),
                        type: 'success',
                        confirmButtonColor: '#1967D2',
                        timer: 2000,
                    });
                    // location.reload();
                }
            });
        }
    });
});

listenClick('.edit-comment-btn', function (event) {
    event.preventDefault();

    let editId = $(this).data('id');
    $('.comment-id').val($('.delete-comment-btn').data('id'));
    $.ajax({
        type:'GET',
        url:route('blog.edit.comment', editId),
        success:function(result){
            $('.comment').val(result.data.comment);
            $('.comment-name').val(result.data.name);
            $('.comment-email').val(result.data.email);
            $('.comment-id').val(result.data.id);
            $('#comment-field').focus();
        },
        error:function (result){
            displayErrorMessage(result.responseJSON.message);
        }
    });
});

function addComment(){
    $.ajax({
        type: 'POST',
        url: $('#blogComment').val(),
        data: $('#commentForm').serialize(),
        success: function (result) {
            if (result.success) {
                // setTimeout(function () {
                //     location.reload();
                // }, 5000);
                let commentCount = $('.comments').find('.comment-card').length +
                    1;
                if ($('.comments').find('.comment-card').length === 0) {
                    $('.comment-count').text('(' + commentCount + ')');
                } else {
                    $('.comment-count').text('');
                    $('.comment-count').text('(' + commentCount + ')');
                }
                if (commentCount >= 0) {
                    $('.comments').show()
                    $('#post-comment').show();
                    $('.comment-lable').removeClass('d-none');
                }
                let data = [
                    {
                        'image': !isEmpty(result.data.user) ? result.data.user.avatar : $('#defaultBlogImage').val(),
                        'commentName': result.data.name,
                        'commentCreated': moment.utc(result.data.created_at).format('DD, MMM yy hh:mm a'),
                        'comment': result.data.comment,
                        'id': result.data.id,
                        'user': result.data.user
                    }];
                $('.comment-box').prepend(
                    prepareTemplateRender('#blogTemplate', data));
                $('#commentForm')[0].reset();
                displaySuccessMessage(result.message);
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#commentForm', '#submitBtn');
        },
    });
}
function updateComment(){
    let updateId = $('.comment-id').val();
    $.ajax({
        type: 'PUT',
        url: route('blog.update.comment', updateId),
        data: $('#commentForm').serialize(),
        success:function (result){
            $('#comment-'+updateId).html('');
            $('#comment-'+updateId).html(result.data.comment);

            $('#commentForm')[0].reset();
            $('.comment-id').val('');
            displaySuccessMessage(result.message);
            processingBtn('#commentForm', '#submitBtn');
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
        complete: function () {
            processingBtn('#commentForm', '#submitBtn');
        },
    });
}

function postComment() {
    let count = $('.comment-count').text();
    let newCount = count.replace('(', '').replace(')', '');
    if (newCount == 0) {
        $('.comments').addClass('d-none');
        $('#post-comment').addClass('d-none');
    }
}

postComment();
