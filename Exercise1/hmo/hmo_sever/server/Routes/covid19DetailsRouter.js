import express from 'express';
import * as covid19DetailsController from '../Controllers/covid19DetailsController.js'
import verifyToken from '../middelware/verifyToken.js';

const router = express.Router();

router.get('/',verifyToken, covid19DetailsController.getCovid19Details) 
router.get('/:id',verifyToken, covid19DetailsController.getCovid19DetailsById) 
router.post('/',verifyToken, covid19DetailsController.addCovid19Details)
router.put('/',verifyToken,covid19DetailsController.updateCovid19Details)
router.delete('/:id',verifyToken,covid19DetailsController.deleteCovid19Details)

export default router;