import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import batchRoute from './batch.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
 
  router.use('/users', userRoute);
  
  router.use('/batches', batchRoute);
 

  return router;
};

export default routes;
