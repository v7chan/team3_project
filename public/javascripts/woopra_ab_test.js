$(document).ready(function() {
  listenForABEvents();
});

function listenForABEvents() {
  $('.a-back-link-click').click(function(e) {
    e.preventDefault();
    console.log("Clicked a version");
    woopra.track("a_version_back_link_clicked");
    setTimeout(function() {
      window.location.href = '/search_page';
    }, 300);
  });

  $('.b-back-button-click').click(function(e) {
    e.preventDefault();
    woopra.track("b_version_back_button_clicked");
    setTimeout(function() {
      window.location.href = '/search_page';
    }, 300);
  });
}