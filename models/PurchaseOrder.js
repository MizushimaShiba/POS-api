const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

const Schema = mongoose.Schema

const purchase_order_schema = mongoose.Schema({
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  store_place: String,
  buy_date: Date,
  image: String,
}, {timestamps: true})

purchase_order_schema.plugin(mongoose_delete)

const PurchaseOrder = mongoose.model('PurchaseOrder', new Schema(purchase_order_schema))

module.exports = PurchaseOrder