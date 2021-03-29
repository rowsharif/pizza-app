const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Order = require('../../models/Order');
const Pizza = require('../../models/Pizza');
const User = require('../../models/User');

// @route    GET api/orders
// @desc     Get all users orders
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    if (orders.length === 0) {
      return res.status(400).json({ msg: 'There is no orders for this user' });
    }
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/orders
// @desc     Create a order
// @access   Public
router.post(
  '/',
  check('firstName', 'First name is required').notEmpty(),
  check('lastName', 'Last name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('address.street', 'Please include a street number').notEmpty(),
  check('address.house', 'Please include a house number').notEmpty(),
  check('address.area', 'Please include an area number').notEmpty(),
  check('phone', 'Phone must be 8 digits').isLength({ min: 8, max: 8 }),
  check('pizzas', 'Please include some pizzas').isArray().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { pizzas, deliveryCost } = req.body;
      let total = 0;

      const ids = pizzas.map((item) => item.pizza);
      let result = await Pizza.find({ _id: { $in: ids } });

      pizzas = pizzas.map((piz) => {
        const pizza = result.filter((p) => p.id === piz.pizza)[0];
        return { ...piz, pizza };
      });

      pizzas.map((piz) => {
        total = total + piz.pizza.price * piz.quantity;
      });

      total = deliveryCost ? total + deliveryCost : total + 16;

      // Get token from header
      const token = req.header('x-auth-token');

      // Check if not token
      if (!token) {
        const newOrder = new Order({
          ...req.body,
          pizzas,
          total,
        });

        const order = await newOrder.save();

        return res.json(order);
      }

      // Verify token
      let user = '';
      jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: 'Token is not valid' });
        }
        user = decoded.user.id;
      });
      const newOrder = new Order({
        ...req.body,
        pizzas,
        user,
        total,
      });

      const order = await newOrder.save();

      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
