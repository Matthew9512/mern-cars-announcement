const carsModel = require('../models/carsModel');
const usersModel = require('../models/usersModel');

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

      if (!findOffer) return res.status(404).json({ message: `Offer not found` });

      res.status(200).json(findOffer);
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const getFeaturesOffer = async function (req, res, next) {
   try {
      const featuresOffer = await carsModel.find({ features: true });

      res.status(200).json(featuresOffer);
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

module.exports = { addNewOffer, getOffer, getFeaturesOffer };
