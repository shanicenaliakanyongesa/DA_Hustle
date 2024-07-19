document.addEventListener('turbo:load', loadAdminData);

function loadAdminData(){

}

listenClick('.changeAdminStatus', function (event) {
    displaySuccessMessage(Lang.get('js.status_change'));
});

listenClick('.admins-delete-btn', function (event) {
    let adminId = $(this).attr('data-id');
    deleteItem(route('admin.destroy', adminId), Lang.get('js.admin'));
});
