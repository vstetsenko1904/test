(function(){
    $('.dashboard-table').basictable({
        breakpoint: 768
    });

    // Mobile menu
    const navigationSelector = '.navigation';
    const activeMobileClass = 'navigation--active-mobile';
    const mobileMenuTogglerSelector = '.mobilemenu-toggler'

    $(document).on('click', mobileMenuTogglerSelector, function(e) {
        $(navigationSelector).toggleClass(activeMobileClass);
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest(navigationSelector).length
            && !$(e.target).closest(mobileMenuTogglerSelector).length) {
            $(navigationSelector).removeClass(activeMobileClass);
        }
    });
}());