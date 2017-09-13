/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

// for Student routes
  'POST /create_student': 'StudentController.create',
  'GET /manage_students': 'StudentController.read',
  'POST /update_student': 'StudentController.update',
  'POST /delete_student': 'StudentController.delete',

  // for Grade routes
  'GET /manage_grades':   'GradeController.read',
  'POST /create_grade':   'GradeController.create',
  'POST /delete_grade':   'GradeController.delete',
  'POST /update_grade':   'GradeController.update',

  // for Assignment routes
  'GET /manage_assignments':   'AssignmentController.read',
  'POST /create_assignment':   'AssignmentController.create',
  'POST /delete_assignment':   'AssignmentController.delete',
  'POST /update_assignment':   'AssignmentController.update',

  // for Instructor routes

  'GET /manage_instructors':   'InstructorController.read',
  'POST /create_instructor':   'InstructorController.create',
  'POST /delete_instructor':   'InstructorController.delete',
  'POST /update_instructor':   'InstructorController.update',

  // for Major routes

  'GET /manage_majors':        'MajorController.read',
  'POST /create_major':        'MajorController.create',
  'POST /delete_major':        'MajorController.delete',
  'POST /update_major':        'MajorController.update',

  // for Class routes

  'GET /manage_courses':        'CourseController.read',
  'POST /create_course':        'CourseController.create',
  'POST /delete_course':        'CourseController.delete',
  'POST /update_course':        'CourseController.update',


  // for Student_class routes

  'GET /manage_studentclasses':        'StudentclassController.read',
  'POST /create_studentclass':         'StudentclassController.create',
  'POST /delete_studentclass':         'StudentclassController.delete',
  'POST /update_studentclass':         'StudentclassController.update',

  // for major_class routes

  'GET /manage_majorclasses':        'MajorclassController.read',
  'POST /create_majorclass':         'MajorclassController.create',
  'POST /delete_majorclass':         'MajorclassController.delete',
  'POST /update_majorclass':         'MajorclassController.update'
};
