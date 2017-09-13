(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of student id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getCourse(record_id){
    return $.get("http://localhost:1337/class/" + record_id, function(data){
      console.log("got course");
    })
  }

  $(function(){

    //initialize variables for items in the DOM we will work with
    let manageCourseForm = $("#manageCourseForm");
    let addCourseButton = $("#addCourseButton");


    $('#courseTable').DataTable({
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      colReorder: true,
      "scrollX": true

    });


    // added front end validations for courses
      manageCourseForm.validate({
          errorClass: 'text-danger',
          rules: {
            // compound rule
            subject: {
              required: true
            },

            course: {
              number: true,
              maxlength: 4
            }

          }
        });


    //add student button functionality
    addCourseButton.click(function(){
      manageCourseForm.trigger('reset');
      manageCourseForm.attr("action", "/create_course");
      manageCourseForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageCourseForm.submit()
          }
        }
      });
    })

  	$("#courseTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("courseid")
      manageCourseForm.find("input[name=class_id]").val(recordId);
      manageCourseForm.attr("action", "/update_course");
      let course = getCourse(recordId);

      //populate form when api call is done (after we get student to edit)
      course.done(function(data){
        $.each(data, function(name, val){
            var $el = $('[name="'+name+'"]'),
                type = $el.attr('type');

            switch(type){
                case 'checkbox':
                    $el.attr('checked', 'checked');
                    break;
                case 'radio':
                    $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    $el.val(val);
            }
        });
      })

      manageCourseForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageCourseForm.submit()
          }
        }
      });
    })


    $("#courseTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("courseid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Course": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
