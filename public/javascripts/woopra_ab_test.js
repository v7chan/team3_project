$(document).ready(function() {
  listenForABEvents();
  goBack();
});

function listenForABEvents() {
  $('.a-back-link-click').click(function(e) {
    e.preventDefault();
    console.log("Clicked a version");
    woopra.track("a_version_back_link_clicked");
    setTimeout(function() {
      window.history.back();
    }, 300);
  });

  $('.b-back-button-click').click(function(e) {
    e.preventDefault();
    woopra.track("b_version_back_button_clicked");
    setTimeout(function() {
      window.history.back();
    }, 300);
  });
}

function goBack() {
  $('.go-back').click(function(e) {
    e.preventDefault();
    window.history.back();
  });
}