(function($){
    $.fn.customPaginator = function (options) {
        let paginateCon = this;
        let pageItems;

        let defaults = {
            itemsPerPage: 2
        };

        let settings = {};
        $.extend(settings, defaults, options);
        pageItems = $(settings.pageItems);
        let linksCount = Math.ceil((pageItems.length / settings.itemsPerPage));
        // console.log(pageItems);

        $("<ul></ul>").prependTo(paginateCon);

        for (var index = 0; index < linksCount; index++) {
            paginateCon.find("ul").append("<li>"+ (index+1) +"</li>");
        }

        pageItems.filter(":gt("+ (current_page-1) + ")").hide();

        paginateCon.find("ul li").on('click', ()=> {
            var current_page = $(this).text();
            var hiddenJobs = pageItems.filter(":lt("+ ((current_page-1) * settings.itemsPerPage) + ")");
            $.merge(hiddenJobs, pageItems.filter(":gt("+ ((current_page * settings.itemsPerPage) - 1) + ")"));
            hiddenJobs.hide();
        //     var visibleJobs = pageItems.not(hiddenJobs);
        //     visibleJobs.show();
        })
    }
}(jQuery));