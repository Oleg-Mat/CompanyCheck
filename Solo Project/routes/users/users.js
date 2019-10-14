const express = require('express');
const router = express.Router();
const User = require('../../models/user.js');
const Auction = require('../../models/auction.js');

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('users here!');
});

router.get('/profile/auction/:id', (req, res) => {
  res.render('users/auction.hbs')
})
router.post('/profile/auction/:id', async (req, res) => {
  // console.log('user ===', req.params);
  // console.log('req body auc: id == ', req.body);
  const user = await User.findOne({ username: req.params.id });
  // console.log('lox ==',user);
  // console.log('lox ==',user._id);

  const auction = new Auction({
    user: user._id,
    name: req.body.itemname,
    condition: req.body.Condition,
    startdate: req.body.datestart,
    enddate: req.body.dateend,
    description: req.body.description,

  });
  await auction.save();
  const userProfile = await User.findOne({ username: req.params.id })
  pp = {
    name: userProfile.username,
    email: userProfile.email,
    id: userProfile._id,
  }
  const userAuction = await Auction.find({ user: userProfile._id })
  // console.log(userAuction);

  res.render('users/userprofile.hbs', { user: pp, auctions: userAuction });

})
router.post('/edit/:id', async (req, res) => {
  console.log(req.params);
  const {itemname,Condition,datestart,dateend,description} = req.body;
console.log(req.body);

 const auc = await Auction.findOne({name:req.params.id})
 console.log(auc.user);
  const user = await User.findOne({_id:auc.user});
  console.log(user);
  
  const man = {
    name:user.username,
    email:user.email,
  }
  const aucname = await Auction.update({name:req.params.id},
    {name:itemname,condition:Condition,startdate:datestart,
    enddate:dateend,description:description});
    const all = await Auction.find()
    res.render('users/userprofile.hbs', { user: man, auctions: all });
})
router.get('/delete/:id', async (req, res) => {
  console.log(req.params);
  // const {itemname,Condition,datestart,dateend,description} = req.body;
  const find = await Auction.findOne({name:req.params.id});
  console.log(find.user);
  
  
  const delet = await Auction.findOneAndDelete({_id:find._id});
console.log(delet);

  const man = {
    name:find.username,
    email:find.email,
  }

const all = await Auction.find()
    res.render('users/userprofile.hbs', { user: man, auctions: all });
    // res.render('users/userprofile.hbs', { user: man, auctions: all });
})
router.get('/edit/:id', async (req, res) => {
  // console.log();
  // console.log('raprams ===', req.params);
  const auc = await Auction.findOne({ name: req.params.id })
  const auction = {
    name: auc.name,
    conditions: auc.condition,
    startdate: auc.startdate,
    enddate: auc.enddate,
    description: auc.description,
  }
  // console.log(auction);

  res.render('users/auction.hbs', { data: auction });
})

router.get('/profile/:id', async function (req, res) {
  const userID = req.params.id;
  const userProfile = await User.findOne({ username: userID })
  user = {
    name: userProfile.username,
    email: userProfile.email,
    id: userProfile._id,
  }

  const userAuction = await Auction.find({ user: userProfile._id })
  res.render('users/userprofile.hbs', { user, auctions: userAuction });
})

// router.get('/:id', async function(req, res) {
//   const userID = req.params.id;
//   const userProfile = await User.find({_id: userID});
// })


// router.post('/', (req, res) => {
//   console.log("Hello i am console");
//   res.redirect('/');
// })

module.exports = router;
