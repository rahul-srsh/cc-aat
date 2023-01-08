const Item = require("../models/item");

const Category = require("../models/category");

const { itemSchema } = require("../validation/validate");

const addItem = async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = req.user;
    // console.log("Add item 1");
    // console.log(req.body);
    //General validation
    const valid = await itemSchema.validateAsync(req.body);
    // console.log("Add item 2");
    //Checking if category is a new category or old category
    let categoryId = valid.category;
    //new category aadding to database
    if (categoryId === "others") {
      //console.log(req.body.categoryName);
      const category = new Category({ name: valid.categoryName });
      categoryId = category._id;
      const resultCategory = await category.save();
      //console.log(resultCategory);
    }
    //checking category if it exists by the id in the database
    else {
      const category = await Category.findOne({
        _id: categoryId,
      }).exec();
      if (!category) {
        return res.status(440).json({ message: "Category Id found!" });
      }
    }
    // console.log("Add item 3");
    //creating item and saving to db
    const item = new Item({
      name: valid.name,
      quantity: valid.quantity,
      category: categoryId,
      userId: user._id,
    });
    const result = await item.save();
    // console.log("Add item 4");
    res.json(result);
  } catch (error) {
    if (error.isJoi) {
      const msg = error["details"][0].message;
      const obj = { message: msg };
      // console.log(msg);
      res.status(422).json(obj);
    }
  }
};

const getItems = async (req, res, next) => {
  // console.log(req);
  // console.log(req.user);
  const user = req.user;
  const items = await Item.find({ userId: user._id }).exec();
  const category = await Category.find().exec();
  let itemsCategory = [];
  //adding the category name to each list item
  for (let item of items) {
    let name = category.find((cat) => cat._id == item.category).name;
    //console.log(name);
    let object = item.toObject();
    object.categoryName = name;
    itemsCategory.push(object);
  }
  res.json(itemsCategory);
};

const getSingleItem = async (req, res, next) => {
  //General validation
  const user = req.user;
  // console.log(user);
  if (req.body.id == null) {
    return res.status(422).json({ message: "Id is required!" });
  }
  const itemMongoose = await Item.findOne({
    _id: req.body.id,
    userId: user._id,
  });
  const item = itemMongoose;
  if (item) {
    //Very important item stores alot of data returned by mongoose
    //let i=item.toObject();
    //console.log(i);
    //returns this
    //{
    // _id: 610e249b6197450cdc05d946,
    // name: 'abcdefg',
    // quantity: 567,
    // category: '610e249b6197450cdc05d944',
    // __v: 0
    // }

    //finding the category name and appending it to object
    let i = item.toObject();
    const category = await Category.findOne({ _id: item.category });
    i.categoryName = category.name;
    return res.json(i);
  }
  res.status(400).json({
    message: "Invalid id.",
  });
};

const updateItem = async (req, res, next) => {
  //General validation
  try {
    const user = req.user;
    const valid = await itemSchema.validateAsync(req.body);
    const item = await Item.findOne({ _id: valid.id, userId: user._id });
    if (!item) {
      throw new Error("Invalid Id");
    }
    //Checking if category is a new category or old category
    let categoryId = valid.category;
    //new category aadding to database
    if (categoryId === "others") {
      //console.log(req.body.categoryName);
      const category = new Category({ name: valid.categoryName });
      categoryId = category._id;
      const resultCategory = await category.save();
      //console.log(resultCategory);
    }
    //checking category if it exists by the id in the database
    else {
      const category = await Category.findOne({
        _id: categoryId,
      }).exec();
      if (!category) {
        return res.status(440).json({ message: "Category Id found!" });
      }
    }
    //if item exists by item item will not be null
    if (item) {
      const updateResult = await item.updateOne({
        name: valid.name,
        quantity: valid.quantity,
        category: categoryId,
        userId: user._id,
      });
      // console.log(updateResult);
      const updatedItem = await Item.findOne({
        _id: valid.id,
        userId: user._id,
      });
      //console.log(item);
      return res.json(updatedItem);
    }
  } catch (error) {
    if (error.isJoi) {
      const msg = error["details"][0].message;
      const obj = { message: msg };
      return res.status(422).json(obj);
    }
    //If id is not in the database
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteItem = async (req, res, next) => {
  const user = req.user;
  //General validation
  // console.log(req.body);
  if (req.body.id == null) {
    return res.status(400).json({ message: "Id is required!" });
  }
  const item = await Item.findOne({ _id: req.body.id, userId: user._id });
  if (item) {
    await item.deleteOne();
    return res.json(item);
  }
  res.status(400).json({
    message: "Invalid id.",
  });
};

//get all categories
const getCategories = async (req, res, next) => {
  const cat = await Category.find().exec();
  res.json(cat);
};

exports.addItem = addItem;
exports.getItems = getItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.getSingleItem = getSingleItem;
exports.getCategories = getCategories;
