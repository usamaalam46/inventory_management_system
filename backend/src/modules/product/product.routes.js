const router = require('express').Router();
const ctrl = require('./product.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');

// ADMIN
router.post('/', protect, authorize('admin'), ctrl.create);
router.put('/:id', protect, authorize('admin'), ctrl.update);
router.delete('/:id', protect, authorize('admin'), ctrl.remove);
router.put('/:id/status', protect, authorize('admin'), ctrl.toggleStatus);

// AUTH USERS
router.get('/', protect, ctrl.getAll);
router.get('/:id', protect, ctrl.getOne);

module.exports = router;