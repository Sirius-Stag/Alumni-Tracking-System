const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const nodemailer = require("nodemailer");
const College = require("../../../models/College");


var rand, host, link;
// @route    POST api/users
// @desc     Register college
// @access   Public
router.post(
    "/",
    [
        check("name", "College Name is required")
            .not()
            .isEmpty(),
        check("collegeId", "College Id is required")
            .not()
            .isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        //  (req, res) => { //removed async due to using node mailer
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { name,
            website,
            collegeId,
            email,
            password } = req.body;

        try {
            let college = await College.findOne({ email });
            // let college =  College.findOne({ email });
            if (college) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "College already exists" }] });
            }

            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            });

            college = new College({
                name,
                website,
                collegeId,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);

            college.password = await bcrypt.hash(password, salt);
            // const salt =  bcrypt.genSalt(10);

            // college.password =  bcrypt.hash(password, salt);
            // //  ===============node mailer=============


            /****************NODEMAILER FROM HERE********** */
            // creating transporter for nodemailer
            // let transporter = nodemailer.createTransport({
            //     host: "smtp.gmail.com",
            //     port: 587,
            //     secure: false, // true for 465, false for other ports
            //     auth: {
            //         college: "diveshanand9110@gmail.com", // generated ethereal college//host college email or admin email(fill email and password)
            //         pass: "Divesh@7737" // generated ethereal password//admin password
            //     },
            //     tls: {
            //         rejectUnauthorised: true
            //     }
            // });

            // // setup email data with unicode symbols
            // // var link="http://"+req.get('host')+"/verify?id="+u_email;//verification link or the path of the college

            // rand = Math.floor((Math.random() * 100) + 54);
            // college.randomNum = rand;
            // host = req.get('host');
            // link = "http://" + req.get('host') + "/verify?id=" + rand;
            // let mailOptions = {
            //     from: '"nodemailer👻" <"diveshanand9110@gmail.com">', // sender address
            //     to: email, // list of receivers
            //     subject: "no_reply just verify your account to be our member", // Subject line
            //     html: "Hello, <br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>" + rand// plain text body
            // };
            // console.log(mailOptions);
            // //sending the mail
            // transporter.sendMail(mailOptions, function (err, info) {
            //     if (err) console.log(err);
            //     else {
            //         res.send("Email is sent");
            //         console.log("SUCCESS IN SENIDNG THE MAIL FROM NODE nodemailer");
            //     }
            // });




            //  ===============node mailer end here=============


            await college.save();
            //  college.save();
            // return jsonwebtoken
            // res.send("College registered");
            const payload = {
                college: {
                    id: college.id
                }
            };

            await jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 3600000 },
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

router.post('/verify', async (req, res) => {
    const { email, num } = req.body;
    console.log(req.protocol + ":/" + req.get('host'));
    // if((req.protocol+"://"+req.get('host'))==("http://"+host))
    // {
    let college = await College.findOne({ email });
    console.log("Domain is matched. Information is from Authentic email");
    if (college.randomNum == rand) {
        if (!college.confirmed) college.confirmed = true;
        res.send(college.confirmed); ``
        await college.save();
        console.log(college.confirmed);
        console.log("email is verified");
    } else {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
    // }
    // else
    // {
    //     res.end("<h1>Request is from unknown source");
    // }
});
module.exports = router;
