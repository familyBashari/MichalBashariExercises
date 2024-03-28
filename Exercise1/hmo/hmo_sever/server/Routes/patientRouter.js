import express from 'express';
import * as patientController from '../Controllers/patientController.js'
import upload from "../middelware/upload.js";
import verifyToken from '../middelware/verifyToken.js';

const router = express.Router();

  
router.get('/',verifyToken, patientController.getPatients)
router.get('/:id',verifyToken, patientController.getPatientById) 

router.get('/image/:id',verifyToken, patientController.getImageOfPatient)

router.post('/',verifyToken, upload.single('image') ,patientController.addPatient)
router.put('/',verifyToken, patientController.updatePatient)
router.delete('/:id',verifyToken, patientController.deletePatient)

export default router;