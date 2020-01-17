const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authcollege = require("../../../middleware/authcollege");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const College = require("../../../models/College");

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/", authcollege, async (req, res) => {
    try {
        const college = await College.findById(req.college.id).select(
            "-password"
        );
        res.json(college);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let college = await College.findOne({ email });

            if (!college) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, college.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const payload = {
                college: {
                    id: college.id
                }
            };

           await jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
