$(document).ready(function() {
  listenForOptionEvents();
});

function listenForOptionEvents() {
  $('.search-option').click(function() {
    var selected = $($(this)).text();
    console.log('Clicked: ' + selected);
    $($(this)).closest('.collapse').prev().find('.current-selection').attr('placeholder', selected);
    $($(this)).closest('.collapse').collapse('hide');
  });
}  