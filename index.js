// console.log("ecoomerce app api");

const express = require('express');
const authMiddleware = require("./middlewares/auth");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartroutes = require("./routes/cart");
const couponRoutes = require("./routes/coupon");
const orderRoutes = require("./routes/order");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/product",productRoutes);
app.use("/api/v1/cart",cartroutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/order", authMiddleware(["buyer"]), orderRoutes);

mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log ("database connection established")) 
.catch((err)=> console.log("error connecting",err));

app.listen(process.env.PORT,()=>{
    console.log(`server is up and running at port ${process.env.PORT}`);
});