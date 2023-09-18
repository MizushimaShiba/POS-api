const Product = require('../models/Product');
const Joi = require('joi').extend(require('@joi/date'));

module.exports = class ProductController {

  static async view(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);

      return res.status(200).json({
        message: 'Okay!',
        data: employee
      })
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const products = await Product.find().populate([{path: 'purchase_order', strictPopulate: false}])

      return res.status(200).json({
        message: 'Okay!',
        data: products
      })
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        stock_quantity: Joi.number().required(),
        stock_per_package: Joi.number().required(),
        stock_damage: Joi.number().required(),
        sku: Joi.string().required(),
        price_wholesale: Joi.number().required(),
        price_retail: Joi.number().required(),
        buy_price: Joi.number().required(),
        image: Joi.string().optional(),
        // category_id: Joi.string().optional(),
        purchase_order: Joi.array().items(Joi.string().required()),
      })

      const validate = schema.validate(req.body)
      if (validate.error) return res.status(422).json({message: validate.error.message, status: false})

      const product = await Product.create(req.body);

      return res.status(200).json({
        message: 'Okay!',
        data: product
      })
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {

      const schema = Joi.object().keys({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        stock_quantity: Joi.number().optional(),
        stock_per_package: Joi.number().optional(),
        stock_damage: Joi.number().optional(),
        sku: Joi.string().optional(),
        price_wholesale: Joi.number().optional(),
        price_retail: Joi.number().optional(),
        buy_price: Joi.number().optional(),
        image: Joi.string().optional(),
        // category_id: Joi.string().optional()
        purchase_order: Joi.array().items(Joi.string().required()),
      })

      const validate = schema.validate(req.body)
      if (validate.error) return res.status(422).json({message: validate.error.message, status: false})

      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.status(200).json({
        message: 'Okay!',
        data: product
      })
    } catch (error) {
      next(error);
    }
  }

  static async updatePrice(req, res, next) {
    try {

      const schema = Joi.object().keys({
        price_wholesale: Joi.number().optional(),
        price_retail: Joi.number().optional(),
        buy_price: Joi.number().optional()
      })

      const validate = schema.validate(req.body)
      if (validate.error) return res.status(422).json({message: validate.error.message, status: false})

      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

      return res.status(200).json({
        message: 'Okay!',
        data: product
      })
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        message: 'Okay!',
        data: product
      })
    } catch (error) {
      next(error);
    }
  }
}