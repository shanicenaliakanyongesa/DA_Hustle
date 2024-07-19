window.listen = function (event, selector, callback) {
    $(document).on(event, selector, callback)
}
window.listenClick = function (selector, callback) {
    $(document).on('click', selector, callback)
}
window.listenSubmit = function (selector, callback) {
    $(document).on('submit', selector, callback)
}
window.listenHiddenBsModal = function (selector, callback) {
    $(document).on('hidden.bs.modal', selector, callback)
}

window.listenShowBsModal = function (selector, callback) {
    $(document).on('show.bs.modal', selector, callback)
}

window.listenChange = function (selector, callback) {
    $(document).on('change', selector, callback)
}
window.listenKeyup = function (selector, callback) {
    $(document).on('keyup', selector, callback)
}

window.listenWithOutTarget = function (event, callback) {
    $(document).on(event, callback)
}

window.IOInitImageComponent = function () {
    var imagePicker = document.querySelectorAll('.image-picker'); // if not found the image-picker object its return

    if (!imagePicker) {
        return;
    }

    for (var i = 0; i < imagePicker.length; i++) {
        var box = imagePicker[i];
        IOInitDropEffect(box);
        IOInitImageUpload(box);
    }
}; // Drop Effect according to the image size

function IOInitDropEffect(box) {
    var area, drop, areaWidth, areaHeight, maxDistance, dropWidth, dropHeight, x, y; // get clickable area for drop effect

    area = box.querySelector('.previewImage');
    area.addEventListener('click', fireRipple);

    function fireRipple(e) {
        area = e.currentTarget; // create drop

        if (!drop) {
            drop = document.createElement('span');
            drop.className = 'drop';
            this.appendChild(drop);
        } // reset animate class


        drop.className = 'drop'; // calculate dimensions of area (longest side)

        areaWidth = getComputedStyle(this, null).getPropertyValue('width');
        areaHeight = getComputedStyle(this, null).getPropertyValue('height');
        maxDistance = Math.max(parseInt(areaWidth, 10), parseInt(areaHeight, 10)); // set drop dimensions to fill area

        drop.style.width = maxDistance + 'px';
        drop.style.height = maxDistance + 'px'; // calculate dimensions of drop

        dropWidth = getComputedStyle(this, null).getPropertyValue('width');
        dropHeight = getComputedStyle(this, null).getPropertyValue('height'); // calculate relative coordinates of click
        // logic: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center

        x = e.pageX - this.offsetLeft - parseInt(dropWidth, 10) / 2;
        y = e.pageY - this.offsetTop - parseInt(dropHeight, 10) / 2 - 30; // position drop and animate

        drop.style.top = y + 'px';
        drop.style.left = x + 'px';
        drop.className += ' animate';
        e.stopPropagation();
    }
} // File Preview Code End

function IOInitImageUpload(box) {
    var uploadField = box.querySelector('.image-upload');
    uploadField.addEventListener('change', getFile);

    function getFile(e) {
        var file = e.currentTarget.files[0];
        checkType(file);
    } // Preview Image to given component


    function previewImage(file) {
        var thumb = box.querySelector('.previewImage'),
            reader = new FileReader();

        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;

            image.onload = function () {
                thumb.style.backgroundImage = 'url(' + e.target.result + ')';
            };
        };

        reader.readAsDataURL(file);
    } // Check Image Type


    function checkType(file) {
        var imageType = /image.*/;

        if (!file.type.match(imageType)) {
            throw 'File Type is not match.';
        } else if (!file) {
            throw 'File not found.';
        } else {
            previewImage(file);
        }
    }
} // every load initialize the Image component on document load

window.IOInitSidebar = function () {
    $('.sidebar-btn').click(function () {
        $('#sidebar').toggleClass('collapsed-menu');
        $('body').toggleClass('collapsed-menu');
        $('.aside-submenu').collapse('hide');
    });
    $('#sidebar-overly').click(function () {
        $('#sidebar').toggleClass('collapsed-menu');
        $('body').toggleClass('collapsed-menu');
    });
    $('.header-btn').click(function () {
        $('#nav-header').addClass('show-nav');
        $('body').addClass('show-nav');
    });
    $('#nav-overly').click(function () {
        $('#nav-header').removeClass('show-nav');
        $('body').removeClass('show-nav');
    }); // for horizontal sidebar

    $('.horizontal-menubar').click(function () {
        $('.horizontal-sidebar').toggleClass('collapsed-menu');
        $('body').toggleClass('collapsed-menu');
    });
    $('#horizontal-menubar-overly').click(function () {
        $('.horizontal-sidebar').toggleClass('collapsed-menu');
        $('body').toggleClass('collapsed-menu');
    }); // for responsive sidebar

    $(window).resize(function () {
        if ($(window).width() > 1200) {
            $('.aside-collapse-btn').click(function () {
                $('#sidebar').removeClass('collapsed-menu');
                $('body').removeClass('collapsed-menu');
            });
        }
    });
};
