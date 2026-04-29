const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// 🔥 MIDDLEWARE TO HANDLE UPLOAD ERRORS
const uploadMiddleware = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      console.log("UPLOAD ERROR:", err); // 👈 see in terminal
      req.flash("error", err.message || "Image upload failed");
      return res.redirect("/listings/new");
    }
    next();
  });
};


// INDEX + CREATE
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    uploadMiddleware,   // ✅ instead of upload.single
    wrapAsync(listingController.createNewListing)
  );


// NEW
router.get("/new", isLoggedIn, listingController.renderNewForm);


// SHOW + UPDATE + DELETE
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .patch(
    isLoggedIn,
    isOwner,
    uploadMiddleware,   // ✅ FIXED HERE ALSO
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );


// EDIT
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
