const express = require('express');
const { 
  createLead, 
  getAllLeads, 
  getLeadById, 
  updateLeadStatus, 
  deleteLead 
} = require('../controllers/lead.controller');

const router = express.Router();

router.post('/', createLead);

router.get('/', getAllLeads);

router.get('/:id', getLeadById);

router.put('/:id/status', updateLeadStatus);

router.delete('/:id', deleteLead);

module.exports = router;
