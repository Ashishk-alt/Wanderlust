const Listing = require("../models/listing.js");

// INDEX
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// SHOW
module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image?.url || "";
  if (originalImageUrl) {
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_250");
  }

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// UPDATE
module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });

    // ✅ SAFE IMAGE UPDATE
    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
      await listing.save();
    }

    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);

  } catch (err) {
    console.log(err);
    req.flash("error", "Error updating listing");
    res.redirect("/listings");
  }
};

// CREATE
module.exports.createNewListing = async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);

    // owner
    newListing.owner = req.user._id;

    // ✅ SAFE IMAGE HANDLING
    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      newListing.image = { url, filename };
    } else {
      // fallback image (prevents crash)
      newListing.image = {
        url: "https://via.placeholder.com/400",
        filename: "default",
      };
    }

    // dummy location (no mapbox)
    newListing.geometry = {
      type: "Point",
      coordinates: [77.2090, 28.6139],
    };

    let savedListing = await newListing.save();
    console.log(savedListing);

    req.flash("success", "New Listing Created");
    res.redirect("/listings");

  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    res.redirect("/listings/new");
  }
};

// DELETE
module.exports.deleteListing = async (req, res) => {
  try {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);

    req.flash("success", "Listing is Deleted!");
    res.redirect("/listings");

  } catch (err) {
    console.log("FULL ERROR:", err);
    req.flash("error", err.message || "Something went wrong");
    res.redirect("/listings");
  }
};