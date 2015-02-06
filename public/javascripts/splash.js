$(document).ready(function() {
  initializePage();
})

function initializePage() {
  $('#get-started').click(function() {
    window.location.href = '/search_page';
  });
}