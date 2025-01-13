const Patient = require('../models/patient.model');

const getAllPatients = async (req, res)=>{
    try {
        const patientList = await Patient.find();
        if(patientList.length === 0){
            return res.status(204).json({
                        success: true,
                        error: false,
                        message : "No content"
            })
        }
        return res.status(200).json({
            success: true,
            error: false,
            patientList : patientList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message : error
        })
    }
}


const getPatientById = async (req, res) => {
    try {
        const {id} = req.params;
    const patient = await Patient.findOne({patientId:id});
    if(!patient){
        return res.status(404).json({
            success: false,
            error: true,
            message:"No patient found with this id"
        })
    } 
    return res.status(200).json({
        success: true,
        error: false,
        patient : patient
    })        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message : error
        })
    }
}

const createPatient = async (req, res) => {
        try {
            const newPatient = req.body;
            if(!newPatient.patientId || !newPatient.name || !newPatient.roomNumber || !newPatient.bedNumber || !newPatient.floorNumber || !newPatient.age || !newPatient.gender || !newPatient.contactInformation || !newPatient.emergencyContact){
                return res.status(500).json({
                            success: false,
                            error: true,
                            message : 'Missing required fields'
                })
            }
            //check by patientId if patient already exists
            const patient = await Patient.findOne({patientId: newPatient.patientId});
            if(patient){
                return res.status(500).json({
                            success: false,
                            error: true,
                            message : 'Patient already exists'
                })
            }
            
            // check by bedNumber if bed is already occupied
            const bedOccupied = await Patient.findOne ({bedNumber: newPatient.bedNumber, roomNumber: newPatient.roomNumber});
            if(bedOccupied){
                return res.status(500).json({
                            success: false,
                            error: true,
                            message : 'Bed already occupied'
                })
            }

            const resp =  await Patient.create(newPatient);
            return res.status(201).send({data: resp});
        } catch (error) {
            return res.status(500).json({
                        success: false,
                        error: true,
                        message : 'Error creating patient'
            })
        }
}

const updatePatient = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        if(!id || !updateData){
            return res.status(400).json({
                        success: false,
                        error: true,
                        message : 'Invalid request data'
            })
        }
        const updatedPatient = await Patient.findOneAndUpdate({patientId:id}, updateData, {new:true});
        if(!updatedPatient){
            return res.status(500).json({
                        success: false,
                        error: true,
                        message : "No patient found with this patientId"
            })
        }
        
        return res.status(200).json({
            success: true,
            error: false,
            updatedPatient : updatedPatient
    })        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            error : error
        })
    }
}

const deletePatient = async (req, res) => {
    try {
        const {id} = req.params;
        const patient = await Patient.findOneAndDelete({patientId:id});
        if(!patient){
            return res.status(500).json({
                        success: false,
                        error: true,
                        message : "No patient found with this patientId"
            })
        }
        
        return res.status(200).json({
            success: true,
            error: false,
            message : "Patient deleted successfully"
    })        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            error : error
        })
    }
}

module.exports = {getAllPatients, getPatientById, createPatient, updatePatient, deletePatient };



