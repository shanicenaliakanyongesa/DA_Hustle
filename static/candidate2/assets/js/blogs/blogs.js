document.addEventListener('turbo:load', loadBlogData);

function loadBlogData() {
    if(!$('#filterCategory').length){
        return
    }

    listenClick('.btnDeletePost', function (event) {
        let postId = $(this).attr('data-id');
        swal({
                title: Lang.get('js.delete') + ' !',
                text: Lang.get('js.are_you_sure_want_to_delete') + '"' +
                      Lang.get('js.post') + '" ?',
                type: 'warning',
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                confirmButtonColor: '#6777ef',
                cancelButtonColor: '#d33',
                cancelButtonText: Lang.get('js.no'),
                confirmButtonText: Lang.get('js.yes'),
            },
            function () {
                  Livewire.dispatch('deletePost', postId);
            });
    });

    document.addEventListener('delete', function () {
        swal({
            title: Lang.get('js.deleted') + ' !',
            text: Lang.get('js.post') +
                Lang.get('js.has_been_deleted'),
            type: 'success',
            confirmButtonColor: '#6777ef',
            timer: 2000,
        });
    });

    let loadStretchy;

        $('#filterCategory').select2({
            width: '100%',
        });

        loadStretchy = () => {
            if ($('.cd-stretchy-nav').length > 0) {
                $(document).on('click', '.cd-nav-trigger', function () {
                    let stretchyNav = $(this).closest('nav');
                    if (stretchyNav.hasClass('nav-is-visible')) {
                        stretchyNav.removeClass('nav-is-visible');
                    } else {
                        $('.cd-stretchy-nav').removeClass('nav-is-visible');
                        stretchyNav.addClass('nav-is-visible');
                    }
                });
                $(document).on('click', function (event) {
                    (!$(event.target).is('.cd-nav-trigger') &&
                        !$(event.target).is('.cd-nav-trigger span')) &&
                    $('.cd-stretchy-nav').removeClass('nav-is-visible');
                });
            }
        };

    loadStretchy();

    let filterCategoryId = null;

    document.addEventListener('livewire:load', function () {
        window.livewire.hook('message.processed', () => {
            $('#filterCategory').select2({
                width: '100%',
            });
            $('#filterCategory').val(filterCategoryId).trigger('change.select2');
        });
    });

    listenChange('#filterCategory', function () {
        filterCategoryId = $(this).val();
        Livewire.dispatch('filterPost', $(this).val());
    });
}
listen('click', '.post-delete-btn', function (event) {
    let postId = $(this).attr('data-id');
    deleteItem(route('posts.destroy', postId),
        Lang.get('js.post'));
});
