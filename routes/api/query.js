const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const Profile = require("../../models/UserProfile");

router.post("/filter", async (req, res) => {
  const { school, uniqueId, degree, todate, fieldofstudy } = req.body;
  var argu = {
    school: school,
    uniqueId: uniqueId,
    degree: degree,
    todate: todate,
    fieldofstudy: fieldofstudy
  };
  
  var result = {};
  for (var prop in argu) {
    if (argu[prop] !== "all") result[prop] = argu[prop];
  }
    try {
       
    const profile = await Profile.find({
      education: {
        $elemMatch:
          // { school: school, uniqueId: uniqueId, degree: degree, todate: todate, fieldofstudy: fieldofstudy }
          result
      }
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// =============for search bar============= need some change
router.get("/search", async (req, res) => {
  const { textforsearch } = req.body;
    // Profile.createIndex({ "$**": "text" })
    try {
        const profile = await Profile.createIndex({ "$**": "text" }).find(
                { $text: { $search: textforsearch } },
                { score: { $meta: "textScore" } }
            )
            .sort({ score: { $meta: "textScore" } });
        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }
        res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
