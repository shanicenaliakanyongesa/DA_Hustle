import moment from 'moment/moment'

listenClick('.post-comment-delete-btn', function (event) {
    let jobId = $(event.currentTarget).attr('data-id');
    deleteItem(route('blog.delete.comment', jobId),
        Lang.get('js.post_comment'));
});

listenClick('.post-comment-show-btn', function (event) {
    // if (ajaxCallIsRunning) {
//            return;
//        }
    moment.locale($('#postCommentLanguage').val())
    ajaxCallInProgress();
    let commentId = $(this).attr('data-id');
    $.ajax({
        url: route('post.comments.show', commentId),
        type: 'GET',
        success: function (result) {
            if (result.success) {
                $('#postTitle,#postComment,#postUser,#postEmail,#postCreatedOn').
                    html('');
                $('#postTitle').append(result.data.post.title);
                $('#postComment').append(result.data.comment);
                $('#postUser').append(result.data.name);
                $('#postEmail').append(result.data.email);
                let created_on = moment(result.data.created_at).fromNow();
                $('#postCreatedOn').append(created_on);
                $('#showPostCommentModal').appendTo('body').modal('show');
                ajaxCallCompleted();
            }
        },
        error: function (result) {
            displayErrorMessage(result.responseJSON.message);
        },
    });
});
