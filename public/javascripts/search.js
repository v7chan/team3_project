$(document).ready(function() {
  listenForSearch();
});

function listenForSearch() {
  $('#search-food').click(function() {
    var location     = $('#select-locations-current').attr('placeholder');
    var time         = $('#select-time-current').attr('placeholder').split(" ")[0];
    var goal         = $('#select-goal-current').attr('placeholder');
    var restrictions = $('#select-restrictions-current').attr('placeholder');

    window.location.href = '/search/results?location=' + location + 
    '&time=' + time +
    '&goal=' + goal +
    '&restrictions=' + restrictions;
  });
}