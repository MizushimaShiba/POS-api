const PurchaseOrder = require('../models/PurchaseOrder')
const Product = require('../models/Product')
const Joi = require('joi')

module.exports = class PurchaseOrderController {

  static async create(req, res) {
    try {
      
      const schema = Joi.object().keys({
        products: Joi.array().items(Joi.object().keys({
          product_id: Joi.string().required(),
          quantity: Joi.number().required()
        })),
        store_place: Joi.string().required(),
        buy_date: Joi.date().required(),
        image: Joi.string().required(),
      })

      const validate = schema.validate(req.body)
      if (validate.error) return res.status(422).json({message: validate.error.message, status: false})

      const {products, store_place, buy_date} = req.body

      const array_of_product_ids = []

      products.forEach(async product => {
        const product_in_stock = await Product.findById(product.id)

        if (product_in_stock) {
          const total_Quantity = product_in_stock.stock_quantity += product.quantity
          await product_in_stock.updateOne({stock_quantity: total_Quantity})
        } else return res.status(404).json({message: "Product not found!"})
        
        array_of_products.push(product.id)
      })

      const purchaseOrder = await PurchaseOrder.create({
        products: array_of_product_ids,
        store_place,
        buy_date
      })

      return res.status(201).json({data: purchaseOrder, message: "Okay!"})
    } catch (error) {
      next(error)
    }
  }

  static async index(req, res) {
    try {
      const purchaseOrders = await PurchaseOrder.find()
      return res.status(200).json({data: purchaseOrders, message: "Okay"})
    } catch (error) {
      next(error)
    }
  }

  static async view(req, res) {
    try {
      const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('Product')
      return res.status(200).json({data: purchaseOrder, message: "Okay"})
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res) {
    try {

      const schema = Joi.object().keys({
        products: Joi.array().items(Joi.object().keys({
          product_id: Joi.string().optional(),
          quantity: Joi.number().optional()
        })),
        store_place: Joi.string().optional(),
        buy_date: Joi.date().optional(),
        image: Joi.string().optional(),
      })

      const validate = schema.validate(req.body)
      if (validate.error) return res.status(422).json({message: validate.error.message, status: false})

      const {products, store_place, buy_date} = req.body

      const array_of_product_ids = []

      products.forEach(async product => {
        const product_in_stock = await Product.findById(product.id)

        if (product_in_stock) {
          const total_Quantity = product_in_stock.stock_quantity += product.quantity
          await product_in_stock.updateOne({stock_quantity: total_Quantity})
        } else return res.status(404).json({message: "Product not found!"})
        
        array_of_product_ids.push(product.id)
      })

      const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, {
        products: array_of_product_ids,
        store_place,
        buy_date
      }, {new: true})
      return res.status(200).json({data: purchaseOrder, message: "Okay"})
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res) {
    try {
      const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id)
      return res.status(200).json({data: purchaseOrder, message: "Okay"})
    } catch (error) {
      next(error)
    }
  }

  

  
}