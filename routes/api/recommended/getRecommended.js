const express = require('express');
const router = express.Router();
// const cors = require('cors');

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

//User model import
const User = require('../../../models/Recommended');


//router.use(cors());

// @route    GET api/users
// @desc     Get all users
// @access   Public
//@route GET api/User
//@desc Get All Users
//@access Public
router.post('/', (req, res) => {
    
    //console.log(req);
    const test_alumni = req.body;
    console.log('[getRecommended]', req.body)
    //res.json({hi:"hi"});
    //res.send('hi');
    User.find({'college' : test_alumni.college})
        .then(Users => {
            //res.json(Users);
    var ans =[];
  class Test {
    constructor(distance,name,username,college,year,company,position,location,gender,branch) {
      this.distance = distance;
      this.username = username;
      this.name = name;
      this.college = college;
      this.year = year;
      this.company = company;
      this.position = position;
      this.location = location;
      this.gender=gender;
      this.branch=branch;
    }
  };
  console.log('[getRecommended]',Users.length);
  for (i = 0; i < Users.length; i++) {

    let alumni = Users[i];
   
    

    if(alumni.username === test_alumni.username)
    {
      //console.log("equal")
     // console.log(test_alumni.username," ",alumni.username)
        continue;
    }

    let d=0;
    let condition = 1;
    if (condition)
    {   

        if (test_alumni.year !== alumni.year)
        { d = d+1; }
        if(test_alumni.company !== alumni.company)
        { d = d+1; }
        if(test_alumni.position !== alumni.position)
        { d = d+1; }
        if(test_alumni.location !== alumni.location)
        { d = d+1; }
        if(test_alumni.gender !== alumni.gender)
        { d = d+1; }
        if(test_alumni.branch !== alumni.branch)
        { d = d+1; }
        
        let t = new Test(d,alumni.name,alumni.username,alumni.college,alumni.year,alumni.company,alumni.position,alumni.location,alumni.gender,alumni.branch);
        ans.push(t);
    }
  }

function compare(a,b)
{
    if(a.distance > b.distance)
    {
        return 1;
    }
    if(a.distance < b.distance)
    {
        return -1;
    }
    return 0;
}

console.log("ans lengthf ",ans.length);
ans.sort(compare);
    
//res.json(ans);

let recommend = [];

for(i =0;i < 6 && i<ans.length; i++)
{
    let rec = {
      name : ans[i].name,
      username:ans[i].username,
      college : ans[i].college,
      year : ans[i].year,
      company : ans[i].company,
      position : ans[i].position,
      location : ans[i].location,
      gender : ans[i].gender,
      branch : ans[i].branch
    }

    recommend.push(rec);
}
console.log('[getRecommended]', recommend);
        res.json(recommend);
        
});
     
});
module.exports = router;