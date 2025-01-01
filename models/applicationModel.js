const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  pharmacyName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
  },
  pharmacyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
    default: null, // Initially null, populated after approval
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Suspended", "Closed"],
    default: "Pending",
  },
  latitude: {
    type: Number,
    required: [true, "Location latitude is required"],
  },
  longitude: {
    type: Number,
    required: [true, "Longitude is required"],
  },
  licenseNumber: {
    type: String,
    required: [true, "License is a pre-requisite for a legal pharmacy"],
    trim: true,
  },
  licenseImage: {
    type: String,
    required: [true, "License image should be provided"],
    trim: true,
  },
  pharmacyImage: {
    type: String,
    required: [true, "License image should be provided"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ApplicationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Application = mongoose.model("PharmacyApplication", ApplicationSchema);

module.exports = Application;
