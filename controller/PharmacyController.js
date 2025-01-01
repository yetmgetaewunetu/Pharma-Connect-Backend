const pharmacyService = require("../services/pharamcyServices");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

// get pharmacy
exports.getPharmacyController = asyncErrorHandler(async (req, res) => {
  const pharmacyId = req.params.id;

  const pharmacy = await pharmacyService.getPharmacyById(pharmacyId);
  res.status(200).json({
    success: true,
    data: pharmacy,
  });
});

// update pharmacy
exports.updatePharmacyController = asyncErrorHandler(async (req, res) => {
  const pharmacyId = req.params.id;
  const updateData = req.body;
  const updatedPharmacy = await pharmacyService.updatePharmacy(
    pharmacyId,
    updateData
  );
  res.status(200).json({
    success: true,
    data: updatedPharmacy,
  });
});

// delete pharmacy
exports.deletePharmacyController = asyncErrorHandler(async (req, res) => {
  const pharmacyId = req.params.id;
  const deletedPharmacy = await pharmacyService.deletePharmacy(pharmacyId);
  res.status(200).json({
    success: true,
    message: "Pharmacy deleted successfully.",
    data: deletedPharmacy,
  });
});

// get pharmacies
exports.getPharmaciesController = asyncErrorHandler(async (req, res) => {
  const filter = req.query;
  const pharmacies = await pharmacyService.getPharmacies(filter);
  res.status(200).json({
    success: true,
    data: pharmacies,
  });
});

/**manage inventory conrollers */

// get inventory of a pharmacy
exports.getInventory = asyncErrorHandler(async (req, res) => {
  const { pharmacyId } = req.params;
  const inventory = await pharmacyService.getInventory(pharmacyId);
  res.status(200).json({
    success: true,
    data: inventory,
  });
});

// add medicine to inventory
exports.addInventoryItem = asyncErrorHandler(async (req, res) => {
  const { pharmacyId } = req.params;
  const medicineData = req.body;
  const inventory = await pharmacyService.addInventoryItem(
    pharmacyId,
    medicineData
  );
  res.status(201).json({
    success: true,
    data: inventory,
  });
});

// update quantity,price & expiredate
exports.updateInventoryItem = asyncErrorHandler(async (req, res) => {
  const medicineData = req.body;
  const { pharmacyId, medicineId } = req.params;
  const inventory = await pharmacyService.updateInventoryItem(
    pharmacyId,
    medicineId,
    medicineData
  );
  res.status(200).json({
    success: true,
    data: inventory,
  });
});

// delete medicine from inventory
exports.deleteInventoryItem = asyncErrorHandler(async (req, res) => {
  const { pharmacyId, medicineId } = req.params;

  const inventory = await pharmacyService.deleteInventoryItem(
    pharmacyId,
    medicineId
  );
  res.status(200).json({
    success: true,
    message: "Pharmacy deleted successfully.",
    data: inventory,
  });
});
