const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const authcollege = require('../../../middleware/authcollege');
const { check, validationResult } = require('express-validator/check');

const CollegeProfile = require('../../../models/CollegeProfile');
const College = require('../../../models/College');
const Post = require('../../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', authcollege, async (req, res) => {
    try {
      const collegeprofile = await CollegeProfile.findOne({ college: req.college.id }).populate(
        'college',
        ['name', 'avatar', 'address']
      );
  
      if (!collegeprofile) {
        return res.status(400).json({ msg: 'There is no profile for this college' });
      }
  
      res.json(collegeprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
    '/',
    [
      authcollege,
      [
        check('address', 'Address is required')
        .not()
        .isEmpty(),
        check('deanname', 'Dean Name is required')
        .not()
        .isEmpty(),
        check('deanContact', 'Dean Contact is required')
          .not()
          .isEmpty(),
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        address,
        deanname,
        deanContact,
        website,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
      } = req.body;
  
      // Build profile object
      const profileFields = {};
      profileFields.college = req.college.id;
      if (address) profileFields.address = address;
      if (website) profileFields.website = website;
      if (deanname) profileFields.deanname = deanname;
      if (deanContact) profileFields.deanContact = deanContact;
      
  
      // Build social object
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;
  
      try {
        // Using upsert option (creates new doc if no match is found):
        let collegeprofile = await CollegeProfile.findOneAndUpdate(
          { college: req.college.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        res.json(collegeprofile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );


  // @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
      const collegeprofiles = await CollegeProfile.find().populate('college', ['name', 'avatar', 'address']);
      res.json(collegeprofiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/college/:college_id', async (req, res) => {
    try {
      const collegeprofile = await CollegeProfile.findOne({
        college: req.params.college_id
      }).populate('college', ['name', 'avatar', 'address']);
  
      if (!collegeprofile) return res.status(400).json({ msg: 'College Profile not found' });
  
      res.json(collegeprofile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Profile not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  // @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', authcollege, async (req, res) => {
    try {
      // Remove user posts
      await Post.deleteMany({ college: req.college.id });
      // Remove profile
      await collegeProfile.findOneAndRemove({ college: req.college.id });
      // Remove user
      await College.findOneAndRemove({ _id: req.college.id });
  
      res.json({ msg: 'College deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  module.exports = router;