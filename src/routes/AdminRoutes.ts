// import express from 'express';

// const clientRouter = express.Router();

// export { clientRouter };

import '../controllers/AdminController';
import { RouterConfigs } from '../core/router';

@RouterConfigs({
  baseUrl: '/',
  mergeParams: true,
})
export class AdminRouter {}
