import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import batchRoute from './batch.route';
import ticketRoute from './ticket.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
 
  router.use('/users', userRoute);
  
 // router.use('/batches', batchRoute);

  router.use('/tickets', ticketRoute);
 

  return router;
};

export default routes;
