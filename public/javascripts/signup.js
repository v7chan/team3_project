$(document).ready(function() {
  listenForSubmit();
});

function listenForSubmit() {
  $('#btn-register').click(function(e) {
    e.preventDefault();

    var postJSON = {};
    postJSON['username'] = $('#email-input').val();
    postJSON['password'] = $('#password-input').val();
    postJSON['password_confirmation'] = $('#password-confirmation-input').val();
    postJSON['goal'] = $('#select-goal-current').val();
    postJSON['restriction'] = $('#select-restrictions-current').val();

    if(!postJSON['username']) {
      $('#email-input').addClass('input-error');
      $('#email-input').closest('div').parent().find('h4').addClass('required');
      $('#email-input').closest('div').parent().find('h4').append("<span> required!</span>");
    }
    else if(!postJSON['password']) {
      $('#password-input').addClass('input-error');
      $('#password-input').closest('div').parent().find('h4').addClass('required');
      $('#password-input').closest('div').parent().find('h4').append("<span> required!</span>");
    }
    else if(!postJSON['password_confirmation']) {
      $('#password-confirmation-input').addClass('input-error');
      $('#password-confirmation-input').closest('div').parent().find('h4').addClass('required');
      $('#password-confirmation-input').closest('div').parent().find('h4').append("<span> required!</span>");
    }
    else {
      jsPOST('/auth/signup', 'post', postJSON);
    }
  });
}

function jsPOST(action, method, input) {
  'use strict';
  var form;
  form = $('<form />', {
    action: action,
    method: method,
    style: 'display: none;'
  });
  if (typeof input !== 'undefined' && input !== null) {
    $.each(input, function (name, value) {
      $('<input />', {
        type: 'hidden',
        name: name,
        value: value
      }).appendTo(form);
    });
  }
  form.appendTo('body').submit();
}