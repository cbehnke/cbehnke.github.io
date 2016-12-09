$(function() {

// Variables
var totalPoints           = 3;
var totalChoices          = 1;

var $pointElements        = $('input[type=radio].ss-q-radio');
var $pointGroups          = $('.ss-radio-group');

var $multiChoiceElements  = $('input[type=checkbox].ss-q-checkbox');
var $multiChoiceGroups    = $('.ss-choices');
var $otherInput           = $('.ss-q-other');

var $range                = $('input[type=range]');
var $rangeElements        = $('input[type=radio].ss-range-choice')

var $errorContainer       = $('#error-container');


// Points UI
function managePointUIState( el ) {

  // Highlighting
  if ( $(el).hasClass('clear') ) {
    var id = $(el).parent().attr('id').split('_')[1];
    $('input:radio[id=group_'+id+'_1]').prop('checked',true);
    $(el).parent().prevAll().removeClass('highlight');
  } else {
    $(el).parent().prevAll().addClass('highlight');
    $(el).parent().nextAll().removeClass('highlight');
  }

  // Disabling
  $pointGroups.each( function() {
    var currentSelectedPointValue     = $(this).find('input[type=radio]:checked').val();

    $(this).find($pointElements).each( function() {
      if ( ( $(this).val() - currentSelectedPointValue ) > managePointCount() ) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    });
  });
}


// Manage points running total
function managePointCount() {
  var currentPoints = 0;

  $pointElements.each( function( i,n ) {
    if ( this.checked ) {
      currentPoints += parseInt( this.value ); 
    } else {
      currentPoints = currentPoints;
    }
  });
  remainingPoints = totalPoints - currentPoints

  return remainingPoints;
}


// Multi-Choice UI
function manageMultiChoiceUIState( el ) {
  var id = $(el).attr('id').split('_')[1];

  if ( $(el).val().length > 0 ) {
    $('input[type=checkbox]#group_'+id+'_4').prop('checked',true);
  } else {
    $('input[type=checkbox]#group_'+id+'_4').prop('checked',false);
  }
}

function manageSlider() {
  $rangeElements.filter('#group_1727813892_'+$range.val()).prop('checked',true);
}


// Set up validation
function manageValidation() {
  var $form = $('#ss-form');
  $form.validate({
    submitHandler: function( form ) {
      manageSlider();
      var remainingPoints = managePointCount();
      if ( remainingPoints == 0 ) {
        form.submit();
      } else {
        $errorContainer.append('<li>Select ' + totalPoints + ' points of technology investment</li>')
      }
    },
    onclick : 'false',
    ignore : '',
    rules: {
      "entry.1997014609"  : { required: true },
      "entry.652512327"   : { required: true },
      "entry.852563347"   : { required: true, minlength: totalChoices, maxlength: totalChoices },
      "entry.515772466"   : { required: true, minlength: totalChoices, maxlength: totalChoices }
    },
    messages: {
      "entry.1997014609"  : { required : 'Name field is required' },
      "entry.652512327"   : { required : 'Department field is required' },
      "entry.852563347"   : {
        required  : 'International: Please select ' + totalChoices + ' options',
        minlength : 'International: Please select {0} options',
        maxlength : 'International: Please select {0} options'
      },
      "entry.515772466"   : {
        required  : 'Verticals: Please select ' + totalChoices + ' options',
        minlength : 'Verticals: Please select {0} options',
        maxlength : 'Verticals: Please select {0} options'
      }
    },
    wrapper : "li",
    errorPlacement: function(error,element) { $errorContainer.append(error); $errorContainer.show(); }
  });
}


// Initialize
function init() {

  // Set up points
  $pointElements.filter(function(){ return this.value=='0' }).prop('checked',true);
  $pointElements.on('change', function() { managePointUIState( this ); });
  $('a.clear').on('click', function( event ) { event.preventDefault(); managePointUIState( this ); });
  managePointCount();

  // Set up multi-choice
  $otherInput.on('blur', function() { manageMultiChoiceUIState( this ); });

  // Set up range slider
  manageSlider();
  $range.on('change', function() { manageSlider(); });

  // Validation
  manageValidation();
}


// Initialize the Form
init();

});
