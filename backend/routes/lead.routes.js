const express = require('express');
const { 
  createLead, 
  getAllLeads, 
  getLeadById, 
  updateLeadStatus, 
  deleteLead 
} = require('../controllers/lead.controller');
const { requireAdminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', createLead);

router.get('/', requireAdminAuth, getAllLeads);

router.get('/:id', requireAdminAuth, getLeadById);

router.put('/:id/status', requireAdminAuth, updateLeadStatus);

router.delete('/:id', requireAdminAuth, deleteLead);

module.exports = router;
