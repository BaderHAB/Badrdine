const express = require('express');
const mongoose = require('mongoose');
const path= require('path');
const morgan = require('morgan');
const { STATUS_CODES } = require('http');
const app= express();
const methodOverride= require('method-override');
const CookieParser = require('cookie-parser');
const session = require('express-session');
const sessionOption = {secret: 'notsecret', resave:false, saveUninitialized: true}
const flash = require('connect-flash')
const bc