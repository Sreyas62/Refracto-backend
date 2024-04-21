const superadminService = require('../services/superadmin.service');

exports.getDepartments = async (req, res) => {
    try {
        
        const response = await superadminService.getDepartments();
        res.send(response)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}