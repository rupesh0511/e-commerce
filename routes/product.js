const express = require("express");
const productController = require("../controllers/product");
const authmiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/", authmiddleware(["admin"]), productController.createproduct);

router.patch("/", authmiddleware(["seller"]), productController.editproduct);

router.get(
  "/",
  authmiddleware(["buyer", "seller"]),
  productController.getproduct
);

router.post("/:productid/review",productController.reviewController);

router.post(
  "/:productid/:action",
  authmiddleware(["buyer", "seller", "admin"]),
  productController.likedislike
);

router.get("/productbyid", productController.productdetails);

module.exports = router;
