const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const College = require('../../../models/College');


// @route    POST api/colleges
// @desc     Register college
// @access   Public
router.post(
  '/',
  [
    check('name', 'College Name is required')
      .not()
      .isEmpty(),
      check('collegeId', 'College Id is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, collegeId, password } = req.body;

    try {
      let college = await College.findOne({ email });

      if (college) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'College already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      college = new College({
        name,
        email,
        collegeId,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      college.password = await bcrypt.hash(password, salt);

      await college.save();

      const payload = {
        college: {
          id: college.id
        }
      };

      await jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
