function closenavbar(){
    $('.navbar-collapse').collapse('hide');
}

function toggleSidebar() {
    $('#sidebar, #working-area, #admin-navbar').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
};

function linksToggleSidebar() {
    if ($('#sidebar').width() === 70 && $(window).width() > 769) {
        return;
    }
    if ($('#sidebar').width() !== 70 && $(window).width() <= 768) {
        toggleSidebar();
    }
}