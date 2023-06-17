const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => console.log('importing data server connected'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

async function importAllData() {
  try {
    await Tour.create(tours);
    console.log('Dados carregados');
  } catch (err) {
    console.log('falhou', err);
  }
  process.exit();
}

async function deleteAllData() {
  try {
    await Tour.deleteMany();
    console.log('Dados deletados');
  } catch (err) {
    console.log('falhou');
  }
  process.exit();
}

if (process.argv[2] === '--import') importAllData();
if (process.argv[2] === '--delete') deleteAllData();
