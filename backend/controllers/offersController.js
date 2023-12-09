const carsModel = require('../models/carsModel');
const usersModel = require('../models/usersModel');
const utils = require('../utils/constants');

const addNewOffer = async function (req, res, next) {
   try {
      const { images, userId, ...reqData } = req.body.carData;
      const { ...seller } = req.body.sellerData;

      const newOffer = await carsModel.create({
         images: JSON.parse(images),
         ...reqData,
         seller,
      });

      if (!newOffer)
         return res.status(404).json({ message: `Couldn't create this offer, please try again or come back later` });

      await usersModel.findByIdAndUpdate(userId, {
         $push: { announcements: newOffer?._id },
         ...seller,
      });

      res.status(200).json({ message: `Offer created successfully`, offerId: newOffer?._id });
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const getOffer = async function (req, res, next) {
   try {
      const { id } = req.params;
      const findOffer = await carsModel.findById(id);

      if (!findOffer) return res.status(404).json({ message: `Ad was deleted or is not longer available` });

      res.status(200).json(findOffer);
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const getFeaturesOffer = async function (req, res, next) {
   try {
      const offer = await carsModel.find({ features: true });

      res.status(200).json({ offer });
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const getSearchOffer = async function (req, res, next) {
   try {
      const { page, ...queryString } = req.query;

      if (!queryString?.brand)
         return res.status(404).json({ message: `Couldn't find offer that matches your criteria` });

      const pagesAmount = Math.ceil(await carsModel.find(queryString).countDocuments()) / utils._RES_PER_PAGE;

      const offer = await carsModel
         .find(queryString)
         .where({ active: true })
         .limit(utils._RES_PER_PAGE)
         .skip((page - 1) * utils._RES_PER_PAGE);

      if (!offer.length)
         return res.status(404).json({ message: `Looks like we don't have an offers that can match your criteria` });

      res.status(200).json({ offer, pagesAmount });
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

module.exports = { addNewOffer, getOffer, getFeaturesOffer, getSearchOffer };

// const getSearchOffer = async function (req, res, next) {
//    try {
//       const { brand, model, fuel, year, page } = req.query;

//       console.log(page);
//       let searchQuery = { brand };

//       if (!brand) return res.status(404).json({ message: `Couldn't find offer that matches your criteria` });
//       if (model && model !== 'all') searchQuery.model = model;
//       if (fuel && fuel !== 'all') searchQuery.fuel = fuel;
//       if (year && year !== 'all') searchQuery.year = year;

//       const pagesAmount = Math.ceil(await carsModel.find(searchQuery).countDocuments());

//       const offer = await carsModel
//          .find(searchQuery)
//          .limit(utils._RES_PER_PAGE)
//          .skip((page - 1) * utils._RES_PER_PAGE);

//       console.log(pagesAmount);

//       if (!offer.length)
//          return res.status(404).json({ message: `Looks like we don't have an offers that can match your criteria` });

//       res.status(200).json({ offer, pagesAmount });
//    } catch (error) {
//       next(error.message);
//       console.log(error.message);
//    }
// };
