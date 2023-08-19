const router = require("express").Router();
const {User} = require("../models/user");

//import todo model
const todoItemsModel = require("../models/todo");

//post method to add an new item
router.post("/api/item/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const newItem = new todoItemsModel({
      item: req.body.item,
      user_id: user._id,
    });
    //save this item to db
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//get method to get all item
router.get("/api/items/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const listAllItems = await todoItemsModel.find({user_id});
    if (listAllItems.length === 0) {
      return res.status(404).json({ message: 'No items found for the user' });
    }
    res.status(200).json(listAllItems);
  } catch (err) {
    res.json(err);
  }
});

// put method to update item
router.put("/api/item/:id", async (req, res) => {
  try {
    //find the item by its id
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("item updated");
  } catch (err) {
    res.json(err);
  }
});

//delete method to delete item
router.delete("/api/item/:id", async (req, res) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("item deleted");
  } catch (err) {
    res.json(err);
  }
});

router.delete("/api/delall", async (req, res) => {
  try {
    const deleteAllItems = await todoItemsModel.deleteMany();
    res.status(200).json("allItem are deleted");
  } catch (error) {
    res.json(error);
  }
})

// Put method to update item status
router.put("/api/item/status/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedStatus = req.body.status;

    // Find the item by its id and update its status
    const updateStatus = await todoItemsModel.findByIdAndUpdate(
      itemId,
      { $set: { status: updatedStatus } },
      { new: true } // Return the updated item
    );

    res.status(200).json(updateStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//export router
module.exports = router;
