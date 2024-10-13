// Every setup and connections in out tests
require("../models/User");

const mongoose = require("mongoose");
const keys = require("../config/keys");

// which type of promises
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI);
