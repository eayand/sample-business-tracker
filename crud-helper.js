// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Workspace = require('./models/workspace')
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order, workspace;
let users, items, categories, orders, workspaces;

//uncomment the models above when needed and use the .load crud-helper.js command in the terminal to test models without having to enter all their info in the terminal
//The models and variables will be different for other

// mern-infrastructure[main*] % node
// Welcome to Node.js v18.11.0.
// Type ".help" for more information.
// > .load crud-helper.js


{ 
    variable ? 
    <>
    </>
: 
    <>
    </>
}

{ 
    variable ? 
    <>
    </>
: 
    null
}


{ 
    user.workspace.length > 0 ? 

    <>
        stuff
    </>

: 

    undefined 
}



{ user.role === 'admin' ? 
    <>
    stuff
    </>
: 
    <>
    other stuff
    </>
}