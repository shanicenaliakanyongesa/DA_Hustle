listenClick('.removeJob', function (event) {
    let favouriteJobId = $(event.currentTarget).attr('data-id');
    deleteItem(route('favourite.jobs.delete',favouriteJobId), Lang.get('js.favourite_job'));
});
