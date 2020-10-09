const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get('/error', (req, res, next) => {

    // Log out custom error handler indication
    console.log('Custom error route called');
  
    const err = new Error();
    err.message = `Custom 500 error thrown`
    err.status = 500;
    throw err;
  });
  
router.get('/:id', (req, res, next) => {
    if(projects[req.params.id]){
        res.render('project', { project: projects[req.params.id] }); 
    } else {
        const err = new Error();
        err.status = 404;
        err.message = `Looks like the project you were looking for doesn't exist.`
        next(err);
    }
});

  
  /* GET individual quote route */
//   router.get('/:id', (req, res, next) => {
  
//     // Log quote handler indication
//     console.log(`Quote ${req.params.id} route called`);
  
//     /* TODO 3: Check if the requested quote exists 
//         - If quote exists, render the 'quote' view with the quote
//         - Else:
//           * Create a new 404 error
//           * Provide an error message
//           * Forward the error to the global error handler
//     */
//     if (projects[req.params.id]) {
//       res.render('project', { project: projects[req.params.id] });
//     } else {
//       const err = new Error();
//       err.status = 404;
//       err.message = `Looks like the project you requested doesn't exist.`
//       next(err);
//     }
//   });

module.exports = router;