const mongoose = require('mongoose');
const express = require('express');

const connectdb = async () => {
    try {
        const connect= await mongoose.connect('mongodb://localhost:27017/blogs')
        console.log("connected");
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectdb;