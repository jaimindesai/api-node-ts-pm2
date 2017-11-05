import express = require('express');
import cors = require('cors');
const router: express.Router = express.Router();
import { listInvoices, byAccount } from '../controllers/invoiceController'

router.get('/account/:account', cors(), byAccount);
router.get('/headers', function (req: express.Request, res: express.Response) {
	res.json(200, req.headers);
})

router.get('/', cors(), listInvoices);

export { router as invoiceRouter };
