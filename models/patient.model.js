const mongoose  = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    diseases: {
        type: [String],
        default: []
    },
    allergies: {
        type: [String],
        default: []
    },
    roomNumber: {
        type: String,
        required: true
    },
    bedNumber: {
        type: String,
        required: true
    },
    floorNumber: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contactInformation: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: String,
        required: true
    }
})

const  Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;

