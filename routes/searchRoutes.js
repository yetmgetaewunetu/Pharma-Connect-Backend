const express = require("express");
const router = express.Router();
const searchController = require("../controller/searchController")

// Search medicine
router.post('/search',searchController.searchMedicineController)
 

module.exports = router;
