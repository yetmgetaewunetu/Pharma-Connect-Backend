const Medicine = require("../models/MedicineModel");
const Pharmacy = require("../models/pharmacyModel");
const Inventory = require("../models/inventoryModel");

exports.searchMedicine = async ({
  medicineName,
  latitude,
  longitude,
  maxDistance,
  minPrice,
  maxPrice,
}) => {
  console.log("🚀 ~ file: searchServices.js:13 ~ medicineName:", medicineName)
  // Find the medicine by name using a case-insensitive search
  const medicine = await Medicine.findOne({
    name: { $regex: medicineName, $options: "i" },
  });
  console.log("🚀 ~ file: searchServices.js:17 ~ medicine:", medicine)

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  // Query inventory for pharmacies that stock the medicine
  const inventoryQuery = {
    medicine: medicine._id,
    // ...(minPrice && { price: { $gte: minPrice } }),
    // ...(maxPrice && { price: { $lte: maxPrice } }),
  };

  let inventoryItems = await Inventory.find(inventoryQuery).populate("pharmacy");
  console.log("🚀 ~ file: searchServices.js:32 ~ inventoryItems:", inventoryItems)

  // If location is provided, filter pharmacies by distance
  if (latitude && longitude && maxDistance) {
    const RADIUS_IN_KM = 6371; // Earth's radius in kilometers
    inventoryItems = inventoryItems.filter((item) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        item.pharmacy.latitude,
        item.pharmacy.longitude
      );
      return distance <= maxDistance;
    });
  }

  // Transform results for response
  return inventoryItems.map((item) => ({
    pharmacyName: item.pharmacy.name,
    address: item.pharmacy.address,
    photo: item.pharmacy.photo,
    price: item.price,
    quantity: item.quantity,
    latitude: item.pharmacy.latitude,
    longitude: item.pharmacy.longitude,
  }));
};

// Helper function to calculate distance between two lat/lng points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const RADIUS_IN_KM = 6371; // Earth's radius in kilometers

  return RADIUS_IN_KM * c;
};
