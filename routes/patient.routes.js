const express = require('express');
const patientRouter = express.Router();
const {getAllPatients, getPatientById, createPatient, updatePatient, deletePatient} = require('../controllers/patient.controller');

// Read all patients
patientRouter.get('/', getAllPatients);

// Read a single patient by ID
patientRouter.get('/:id', getPatientById);

// Create a new patient
patientRouter.post('/add-new-patient', createPatient);

// Update a patient by ID
patientRouter.put('/update-patient/:id', updatePatient);

// Delete a patient by ID
patientRouter.delete('/delete-patient/:id', deletePatient);

module.exports = patientRouter;





