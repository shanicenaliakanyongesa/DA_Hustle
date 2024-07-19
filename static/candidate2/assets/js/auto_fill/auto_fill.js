
document.addEventListener('turbo:load', loadAutoFieldsData);

function loadAutoFieldsData() {
    window.changeCredentials = function changeCredentials(email, password) {
        $('#email').val(email);
        $('#password').val(password);
    };
}
    listenClick('.admin-login', function () {
        changeCredentials('admin@infyjobs.com', '123456');
    });
    listenClick('.candidate-login', function () {
        changeCredentials('candidate@gmail.com', '123456');
    });
    listenClick('.employee-login', function () {
        changeCredentials('employer@gmail.com', '123456');
    });
