const usersModel = require('../models/usersModel');
const carsModel = require('../models/carsModel');
const chatModel = require('../models/chatsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async function (req, res, next) {
   try {
      const { password, username, email } = req.body;

      if (!username || !password || !email) return res.status(400).json({ message: `User data required` });

      const duplicate = await usersModel.findOne({ email });

      if (duplicate) return res.status(409).json({ message: `Email is invalid or already taken` });

      const bcryptPass = await bcrypt.hash(password, 10);

      await usersModel.create({
         password: bcryptPass,
         email,
         username,
      });

      res.status(200).json({ message: `Account successfully created, welcome ${username}` });
   } catch (error) {
      next(error.message);
   }
};

const login = async function (req, res, next) {
   try {
      const { password, email } = req.body;

      if (!password || !email) return res.status(400).json({ message: `User data required` });

      const user = await usersModel.findOne({ email });

      if (!user) return res.status(401).json({ message: `We cant find user with provided mail` });

      const bcryptComp = await bcrypt.compare(password, user.password);

      if (!bcryptComp) return res.status(401).json({ message: `Wrong email or password` });

      const accessToken = jwt.sign({ email, username: user.username, id: user._id }, process.env.ACCESS_TOKEN, {
         expiresIn: '1d',
      });
      const refreshToken = jwt.sign({ email, username: user.username, id: user._id }, process.env.REFRESH_TOKEN, {
         expiresIn: '7d',
      });

      res.cookie('jwtCar', refreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'None',
         maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: `Login successful, welcome back ${user.username}`, accessToken });
   } catch (error) {
      next(error.message);
   }
};

const logout = (req, res) => {
   const cookies = req.cookies;

   if (!cookies?.jwt) return res.sendStatus(204);

   res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

   res.status(200).json({ message: `Logout successful` });
};

const deleteAcc = async function (req, res, next) {
   try {
      const { id } = req.params;

      const user = await usersModel.findByIdAndDelete(id);

      if (!user) return res.status(404).json({ message: `User not found` });

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

      res.status(200).json({ message: `Account successfully deleted` });
   } catch (error) {
      next(error.message);
   }
};

const updateUserInfo = async function (req, res, next) {
   try {
      const { id } = req.params;

      if (!id) return res.status(404).json({ message: `User data required` });

      await usersModel.findByIdAndUpdate(id, { ...req.body });

      res.status(200).json({ message: `Your account has been updated` });
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const getSellerInfo = async function (req, res, next) {
   try {
      const { id } = req.params;

      const user = await usersModel.findById(id).select('city telNumber contactPerson');

      res.status(200).json(user);
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const getUser = async function (req, res, next) {
   try {
      const { id } = req.params;

      const user = await usersModel.findById(id).select('-password');
      const unseenChats = (await chatModel.find({ members: { $in: [user?._id] }, reciverId: id, reciverSeen: false }))
         .length;

      res.status(200).json({ user, unseenChats });
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const activateOffer = async function (req, res, next) {
   try {
      const { offerID } = req.body.body;
      if (!offerID) return res.status(400).json({ message: `Offer data required` });

      await carsModel.findByIdAndUpdate(offerID, { active: true });

      res.status(200).json({ message: `Your offer active again` });
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const deactivateOffer = async function (req, res, next) {
   try {
      const { offerID } = req.body.body;
      if (!offerID) return res.status(400).json({ message: `Offer data required` });

      await carsModel.findByIdAndUpdate(offerID, { active: false, features: false });

      res.status(200).json({ message: `Your offer is no longer active` });
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

const removeOffer = async function (req, res, next) {
   try {
      const { userID, offerID } = req.body.body;
      if (!userID || !offerID) return res.status(400).json({ message: `Offer data required` });

      const deleteCar = await carsModel.findByIdAndDelete(offerID);

      if (deleteCar) await usersModel.findByIdAndUpdate(userID, { $pull: { announcements: offerID } });

      res.status(200).json({ message: `Offer removed successfully` });
   } catch (error) {
      next(error.message);
      console.log(error.message);
   }
};

module.exports = {
   register,
   login,
   getSellerInfo,
   getUser,
   deleteAcc,
   updateUserInfo,
   logout,
   deactivateOffer,
   activateOffer,
   removeOffer,
};
