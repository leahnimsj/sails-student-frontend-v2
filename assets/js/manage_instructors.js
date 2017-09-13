(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of student id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=instructor_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getInstructor(record_id){
    return $.get("http://localhost:1337/instructor/" + record_id, function(data){
      console.log("got instructor");
    })
  }

  $(function(){

    //initialize variables for items in the DOM we will work with
    let manageInstructorForm = $("#manageInstructorForm");
    let addInstructorButton = $("#addInstructorButton");


    $('#instructorTable').DataTable({
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      colReorder: true,
      "scrollX": true

    });


// added front end validations for instructor - for example, important that user can only enter 1 or 0 for tenured
      manageInstructorForm.validate({
          errorClass: 'text-danger',
          rules: {
            // simple rule, converted to {required:true}
            first_name: {
              required: true,
              minlength: 2
            },
            // compound rule
            last_name: {
              required: true,
              minlength: 2
            },

            major_id: {
              number: true,
              required: true,
            },

            tenured: {
              min: 0,
              max: 1
            }

          },
          messages: {
            first_name: {
              minlength: "Is the name really only 1 letter?"
            },
            last_name: {
              minlength: "Is the name really only 1 letter?"
            },
            major_id: {
              number: "This must be a number."
            }

          }
        });


    //add student button functionality
    addInstructorButton.click(function(){
      manageInstructorForm.trigger('reset');
      manageInstructorForm.attr("action", "/create_instructor");
      manageInstructorForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageInstructorForm.submit()
          }
        }
      });
    })

  	$("#instructorTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("instructorid")
      manageInstructorForm.find("input[name=instructor_id]").val(recordId);
      manageInstructorForm.attr("action", "/update_instructor");
      let instructor = getInstructor(recordId);

      //populate form when api call is done (after we get student to edit)
      instructor.done(function(data){
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

      manageInstructorForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageInstructorForm.submit()
          }
        }
      });
    })


    $("#instructorTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("instructorid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Instructor": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
