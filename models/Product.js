const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')
const Schema = mongoose.Schema

const product_schema = mongoose.Schema({
  name: String,
  description: String,
  stock_quantity: Number,
  stock_per_package: Number,
  stock_damage: Number,
  sku: String,
  price_wholesale: Number,
  price_retail: Number,
  buy_price: Number,
  image: String,
  // category_id: String,
  purchase_order: [{type: Schema.Types.ObjectId, ref: 'PurchaseOrder'}],
}, {timestamps: true})

product_schema.plugin(mongoose_delete)

const Product = mongoose.model('Product', new Schema(product_schema))



module.exports = Product