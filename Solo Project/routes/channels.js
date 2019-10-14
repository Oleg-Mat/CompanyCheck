const express = require('express');
const router = express.Router();
const Channel = require('../models/channel.js')
const Auction = require('../models/auction.js')

router.get('/', async function(req, res) {
    let currentUser = req.session.user.username || 'User';
    // const channels = await Channel.find();
    const auction = await Auction.find();
    // res.render('channels', {currentUser, notlogged: !req.session.user, channels});
    res.render('main', {currentUser, notlogged: !req.session.user, auction});
  });

module.exports = router;