$(function() {
    var maxChecked = 3; // 最大選択数
    $('input[type="checkbox"]').click(function(){
      var checkedCount = $('input[type="checkbox"]:checked').length;
      if (checkedCount > maxChecked) {
        $(this).prop('checked', false);
      }
      if ($(this).prop('checked')) {
        $(this).parent().addClass('checked');
      } else {
        $(this).parent().removeClass('checked');
      }
    });
  });

  $(function() {
    $('#next-button').on('click', function() {
      var checkedValues = $('input[name=myCheckbox]:checked').map(function() {
        return this.value;
      }).get();
      console.log(checkedValues);
      $.ajax({
        type: "POST",
        url: "/",
        data: { values: checkedValues },
        success: function() {
          console.log("INSERT succeeded");
        },
        error: function() {
          console.log("INSERT failed");
        }
      });
    });
  });