
import mongoose = require('mongoose');


let activity: mongoose.Schema = new mongoose.Schema({
	credits: Number,
	disputes: Number,
	adjustments: Number,
	cash: Number
});


export { activity };
