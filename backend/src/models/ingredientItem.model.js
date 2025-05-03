const mongoose = require('mongoose');

// Define the IngredientsItem schema
const IngredientsItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IngredientCategory',
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

// Export the IngredientsItem model
const IngredientsItem = mongoose.model('IngredientsItem', IngredientsItemSchema);
module.exports = IngredientsItem;
