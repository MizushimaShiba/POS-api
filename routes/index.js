const router = require('express').Router()
const JWT = require('jsonwebtoken')


const AuthController = require('../controllers/AuthController')
const EmployeeController = require('../controllers/EmployeeController')
const ProductController = require('../controllers/ProductController')
const PurchaseOrderController = require('../controllers/PurchaseOrderController')

const Employee = require('../models/Employee')

router.get('/', (req, res) => {
  if (req.headers.token) {
    const token = JWT.verify(req.headers.token, process.env.JWT_KEY)
    if (token) {
      Employee.findById(token.id)
      .then(data => {
        if (data) {
          req.user = token
          next()
        } else {
          next({message: 'Please Login Again!'})
        }
      })
    }
  } else res.redirect('/login')
})

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use(function(req, res, next) {
  try {
    const token = JWT.verify(req.headers.token, process.env.JWT_KEY)
    Employee.findById(token.id)
      .then(data => {
        if (data) {
          req.user = token
          next()
        } else {
          next({message: 'Please Login Again!'})
        }
      })
      
  } catch (error) {
    next(error)
  }
})

// Employee Management

router.get('/profile', EmployeeController.view)
router.put('/profile', EmployeeController.update)
router.delete('/profile', EmployeeController.destroy)
router.patch('/profile/password', EmployeeController.password)

// Product Management

router.get('/products', ProductController.list)
router.get('/products/:id', ProductController.view)
router.post('/products', ProductController.create)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)
router.patch('/product-price/:id', ProductController.updatePrice)

// Purchase Order Management

router.get('/purchase-orders', PurchaseOrderController.index)
router.get('/purchase-orders/:id', PurchaseOrderController.view)
router.post('/purchase-orders', PurchaseOrderController.create)
router.put('/purchase-orders/:id', PurchaseOrderController.update)
router.delete('/purchase-orders/:id', PurchaseOrderController.delete)



module.exports = router