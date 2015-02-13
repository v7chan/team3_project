$(document).ready(function() {
  listenForEvents();
})

function listenForEvents() {
  $('.tooltip-hover').hover(function() {
    $('[data-toggle="tooltip"]').tooltip();
  })
}