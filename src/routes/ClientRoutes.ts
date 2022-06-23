// import express from 'express';

// const clientRouter = express.Router();

// export { clientRouter };

import '../controllers/ClientController';
import { RouterConfigs } from '../core/router';

@RouterConfigs({
  baseUrl: '/',
  mergeParams: true,
})
export class ClientRouter {}
