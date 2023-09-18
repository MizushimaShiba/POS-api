
const bcrypt = require('bcrypt')
const Joi = require('joi').extend(require('@joi/date'));
const Employee = require('../models/Employee')

module.exports = class EmployeeController {
  static async view(req, res, next) {
    try {
      const employee = await Employee.findById(req.user.id, 'name username birthdate email')
      
      return res.status(200).json({
        message: 'Okay!',
        data: employee
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req,  res, next) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().optional(),
        name: Joi.string().optional(),
        username: Joi.string().optional(),
        birthdate: Joi.date().format('YYYY-MM-DD')
      })

      const validate = schema.validate(req.body)
      if (validate.error) return res.status(422).json({message: validate.error.message, status: false})

      const { email, name, username, birthdate} = req.body

      const employee = await Employee.findByIdAndUpdate(
        req.user.id,
        {email, name, username, birthdate},
        {runValidators: true, omitUndefined: false, new: true})

      if (!employee) return res.status(404).json({
        message: "User unknown!",
        status: false
      })
      
      return res.status(200).json({
        message: "User updated!",
        data: employee
      })
    } catch (error) {
      next(error)
    }
  }
  static async destroy(req, res, next) {
    try {
      const employee = await Employee.findByIdAndDelete(req.user.id)

      if (!employee) return res.status(404).json({
        message: "User unknown!",
        status: false
      })
      
      return res.status(200).json({
        message: "User deleted!"
      })
    } catch (error) {
      next(error)
    }
  }
  static async password(req, res, next) {
    try {
      const schema = Joi.object().keys({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
      })
      
      const validate = schema.validate(req.body)
      if (validate.error) return res.status(422).json({message: validate.error.message, status: false})

      const employee = await Employee.findById(req.user.id, 'id email password')

      const compared = await bcrypt.compareSync(req.body.oldPassword, employee.password)
      if (!compared) return res.status(404).json({message: 'Password error! Please try again'})

      const salt = await bcrypt.genSalt(10)
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
      console.log(req.body.newPassword)

      await employee.updateOne({
        password: req.body.newPassword
      })
      return res.status(200).json({
        message: "Password updated!",
        data: employee.email
      })
    } catch (error) {
      next(error)
    }
  }
}