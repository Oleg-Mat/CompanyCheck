const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const Channel = require('../models/channel.js')
const Company = require('../models/company.js')
const Question = require('../models/question.js')
const fs = require('fs');
const { sessionChecker, cookiesCleaner } = require("../middleware/auth");
const { google } = require('googleapis');
const fetch = require("node-fetch");
const geocoder = require('geocoder');
const NodeGeocoder = require('node-geocoder');

router
  .route('/')
  .get(sessionChecker, async (req, res) => {
    const channels = await Channel.find();
    const currentUser = req.session.user || 'User';
    // console.log('REQ SES: ', req.session);
    // console.log('REQ COOKIE', req.cookies);

    res.render('index', { title: '', currentUser, notlogged: !req.session.user, channels });
  });



router
  .route('/registration')
  .get(sessionChecker, (req, res) => {
    res.render('users/newuser');
  })
  .post(async (req, res) => {
    console.log('ind post reqbody:', req.body);
    const username = req.body.username;
    const user = await User.findOne({ username });
    if (req.body.password === req.body.username) {
      console.log("error!!");
      res.render('users/newuser', { error: "Password should not be equal to username!Please Retry!" })

    } else if (user) {
      console.log("error!!");
      res.render('users/newuser', { error: "User allready!!Please Retry!" })

    }

    else {

      const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        regdate: new Date()
      });
      await user.save();
      req.session.user = user;
      console.log('ind post reg save: ', req.session);
      res.redirect('/');

      console.log('res reg err!', error);
      res.redirect('/');
    }

  });


router.get('/blacklist', async (req, res, next) => {
  const companys = await Company.find({ "status.black": true });
  const companysAddress = [];
  // console.log(companys.length);
  //massive locations
  let companysLocations = [];
  let companyNames = [];
  //заполняю массив адресов 
  for (let i = 0; i < companys.length; i++) {
    companyNames.push(companys[i].name);
    companysAddress.push(companys[i].address)
    let uri = companys[i].address;
    let result = encodeURI(uri);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${result}&language=ru&key=AIzaSyDuq-AhLoLeNZqLEQ0Qo0DOx3Wr2YBJLeg`)
    const dataFetch = await response.json();
    companysLocations.push(dataFetch.results[0].geometry.location);

    companysLocations = companysLocations.map((location) => {
      return {
        lat: location.lat,
        lng: location.lng
      }
    })
  }

  // console.log("compname = ",companyNames);
  // console.log("adresa = ", companysAddress);
  // console.log("locations = ", companysLocations);
  // console.log(JSON.stringify(dataFetch));
  // console.log(companysAddress);

  const data = { companys }
  // res.render('users/companys', data);
  res.render('users/blacklist', {
    names: JSON.stringify(companyNames),
    location: JSON.stringify(companysLocations),
    companys
  });

});

router.get('/companys', async (req, res, next) => {
  //massive addressov
  const companysAddress = [];
  const companys = await Company.find();
  // console.log(companys.length);
  //massive locations
  let companysLocations = [];
  let companyNames = [];
  //заполняю массив адресов 
  for (let i = 0; i < companys.length; i++) {
    companyNames.push(companys[i].name);
    companysAddress.push(companys[i].address)
    let uri = companys[i].address;
    let result = encodeURI(uri);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${result}&language=ru&key=AIzaSyDuq-AhLoLeNZqLEQ0Qo0DOx3Wr2YBJLeg`)
    const dataFetch = await response.json();
    companysLocations.push(dataFetch.results[0].geometry.location);

    companysLocations = companysLocations.map((location) => {
      return {
        lat: location.lat,
        lng: location.lng
      }
    })
  }

  // console.log("compname = ",companyNames);
  // console.log("adresa = ", companysAddress);
  // console.log("locations = ", companysLocations);
  // console.log(JSON.stringify(dataFetch));
  // console.log(companysAddress);

  const data = { companys }
  // res.render('users/companys', data);
  res.render('users/companys', {
    names: JSON.stringify(companyNames),
    location: JSON.stringify(companysLocations),
    companys
  });
});
router.get('/questions', async (req, res, next) => {

  const questions = await Question.find();
  const data = { questions }
  console.log(data);
  res.render('users/questions', data);
});
router.get('/addcompany', async (req, res, next) => {

  const comp = await Company.findOne();
  console.log(comp);


  res.render('users/newcategoryform');
});
router.post('/addcompany', async (req, res, next) => {

  console.log("req== ", req.body);
  const question = new Question({
    companyname: req.body.name,
    name: req.body.question,
    answer: req.body.answer,
    category: req.body.answer,
  });
  await question.save();

  console.log(question._id);
  const company = new Company({
    name: req.body.name,
    address: req.body.address,
    status: {
      cool: false,
      normal: true,
      black: false,
    },
    Questions: [{
      id: question._id,
    }]
  });

  await company.save();
  // const comp = await Company.findOne();
  // console.log(comp);
  // console.log(company);

  //  res.redirect('users/company');
  // res.render('users/newcategoryform');

  //massive addressov
  const companysAddress = [];
  const companys = await Company.find();
  // console.log(companys.length);
  //massive locations
  let companysLocations = [];
  let companyNames = [];
  //заполняю массив адресов 
  for (let i = 0; i < companys.length; i++) {
    companyNames.push(companys[i].name);
    companysAddress.push(companys[i].address)
    let uri = companys[i].address;
    let result = encodeURI(uri);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${result}&language=ru&key=AIzaSyDuq-AhLoLeNZqLEQ0Qo0DOx3Wr2YBJLeg`)
    const dataFetch = await response.json();
    companysLocations.push(dataFetch.results[0].geometry.location);

    companysLocations = companysLocations.map((location) => {
      return {
        lat: location.lat,
        lng: location.lng
      }
    })
  }

  // console.log("compname = ",companyNames);
  // console.log("adresa = ", companysAddress);
  // console.log("locations = ", companysLocations);
  // console.log(JSON.stringify(dataFetch));
  // console.log(companysAddress);

  const data = { companys }
  // res.render('users/companys', data);
  res.render('users/companys', {
    names: JSON.stringify(companyNames),
    location: JSON.stringify(companysLocations),
    companys
  });
});
router.get('/company/:id', async (req, res, next) => {

  console.log(req.params.id);
  const questions = await Question.find({ companyname: req.params.id });
  // const companyQuestions = await Company.find({name:req.params.id}).populate("Questions",[],"Question");
  //   console.log(questions);
  //  const arr = [];
  //   for(let i = 0 ; i < questions.length;i++) {

  //         arr.push({name:questions[i].name,answer:questions[i].answer})
  //   }
  //   console.log(arr);

  //   const questionn = {arr};
  //   console.log(questionn);
  const companys = await Company.find({ name: req.params.id });

  ////////////////////////////////////
  const companysAddress = [];
  //const companys = await Company.find();
  // console.log(companys.length);
  //massive locations
  let companysLocations = [];
  let companyNames = [];
  //заполняю массив адресов 
  for (let i = 0; i < companys.length; i++) {
    companyNames.push(companys[i].name);
    companysAddress.push(companys[i].address)
    let uri = companys[i].address;
    let result = encodeURI(uri);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${result}&language=ru&key=AIzaSyDuq-AhLoLeNZqLEQ0Qo0DOx3Wr2YBJLeg`)
    const dataFetch = await response.json();
    companysLocations.push(dataFetch.results[0].geometry.location);

    companysLocations = companysLocations.map((location) => {
      return {
        lat: location.lat,
        lng: location.lng
      }
    })
  }

  // console.log("compname = ",companyNames);
  // console.log("adresa = ", companysAddress);
  // console.log("locations = ", companysLocations);
  // console.log(JSON.stringify(dataFetch));
  // console.log(companysAddress);

  const data = { companys }
  // res.render('users/companys', data);
  res.render('users/companys', {
    names: JSON.stringify(companyNames),
    location: JSON.stringify(companysLocations),
    companys, questions
  });
  //const data = { questions }
  // console.log(data);
  res.render('users/questions', { questions, companys });
  // res.render('users/questions',questionn)
  // const questions = await Company.find({question});

  // res.send('zxzx');
});
router.route('/login')
  .get(sessionChecker, (req, res) => {

    res.render('users/login');
  })
  .post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);

    const user = await User.findOne({ email });
    if (!user) {
      res.redirect('/login');
    } else if (user.password !== password) {
      res.redirect('/login');
    } else {
      req.session.user = user;
      console.log('LOGGED IN from index!');
      // res.end();
      res.redirect('/')
    }
  });

router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      await req.session.destroy();
      console.log('SESSION KILLED');
      // cookiesCleaner();
      res.redirect('/');
    }
    catch (error) {
      next(error);
    }
  } else {
    res.redirect('/');
  }
});
const key = 'AIzaSyDuq-AhLoLeNZqLEQ0Qo0DOx3Wr2YBJLeg';
router.get('/api', async (req, res, next) => {
  const uri = "Москва,Вавилова1";
  const result = encodeURI(uri);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${result}&language=ru&key=AIzaSyDuq-AhLoLeNZqLEQ0Qo0DOx3Wr2YBJLeg`)

  const data = await response.json();
  console.log(JSON.stringify(data));

  const location = data.results[0].geometry.location;
  console.log(location);
  let obj = {
    name: "Oleg"
  }
  let arr1 = [1, 2, 3, 4, 5]
  // res.render('users/map', location);
  res.render('users/map', { arr: JSON.stringify(arr1) });
});

module.exports = router;
