const Company = require('./company');
const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/Elbr", {useNewUrlParser: true});

async function createCompany() {
    const company = new Company({
      name: "Винни и Комания",
      address: "Люберцы,Кирова",
      status: {
        cool:false,
        normal:false,
        black:true,
      },
      Questions: [{
        id:"5d84bdbf1dadb927a753674a"
      },
      {
        id:"5d84bc13e8f05f2609e99b28"
      },
      
    ]
    
    });

    await company.save();
    // console.log(channel);
};

 createCompany();
 