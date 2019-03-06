function closenavbar(){
    $('.navbar-collapse').collapse('hide');
}

function toggleSidebar() {
    $('#sidebar, #dg-content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
};