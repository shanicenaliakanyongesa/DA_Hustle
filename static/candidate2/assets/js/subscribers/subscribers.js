listenClick('.subscriber-delete-btn', function (event) {
    let subscriberId = $(event.currentTarget).attr('data-id');
    deleteItem(route('subscribers.destroy', subscriberId),
        Lang.get('js.subscriber'));
})
