const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  
  const router = require("express").Router();
  const CryptoJS = require("crypto-js");
  const Cart = require("../models/Cart");
  
  // CREATE
  router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
      const saveCart = await newCart.save();
      res.status(200).json(saveCart);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // UPDATE
  router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const newCart = await Cart.findOneAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(newCart);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // DELETE
  router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart is Deleted!!!");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // GET USER
  router.get("/find/:userId", async (req, res) => {
    try {
      const newCart = await Cart.findOne({userId:req.params.userId});
      res.status(200).json(newCart);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // GET ALL P
  router.get("/",verifyTokenAndAdmin, async (req, res) => {

    try {
      const cards = await Cart.find();
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  module.exports = router;
  