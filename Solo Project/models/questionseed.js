const Question = require('./question');
const faker = require('faker');
const mongoose = require('mongoose');
///"Рога и Копыта",
mongoose.connect("mongodb://localhost/Elbr", {useNewUrlParser: true});

async function createQuestion() {
    const question = new Question({
      companyname:"Винни и Комания",
      name: "2+2?",
      answer: "4",
      category: "???",
      
    });

    await question.save();
    // console.log(channel);
};

createQuestion();
