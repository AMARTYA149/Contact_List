const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//middleware 1
// app.use(function(request, response, next){
//     console.log('middleware 1 called');
//     next();
// });

// //middleware 2
// app.use(function(request, response, next){
//     console.log('middleware 2 called');
//     next();
// });

var contactList = [
    {
        name: "Amartya",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "9999999999"
    },
    {
        name: "Bruce Wayne",
        phone: "8888888888"
    }
]

app.get('/', function(request, response){
    // console.log(__dirname);
    // response.send('<h1>It is running well</h1>');

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from DB');
            return;
        }
        return response.render('home', {
            title: "My Contacts List",
            contact_list: contacts
        });
    });   
});

app.get('/practice', function(request, response){
    return response.render('practice', {
        title: "play with ejs"
    });
});

app.post('/create-contact', function(request, response){
    // return response.redirect('/practice');
    // contactList.push({
    //     name: request.body.name,
    //     phone: request.body.phone
    // });

    // contactList.push(request.body);
    // return response.redirect('back');
    Contact.create({
        name: request.body.name,
        phone: request.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating contact!');
            return;
        }
        console.log('********', newContact);
        return response.redirect('back');
    });
});

//for deleting a contact
app.get('/delete-contact', function(request, response){
    //get the query from the url
    // let phone = request.query.phone;

    //get the id from query in the url
    let id = request.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return response.redirect('back');
    });

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log('Yes, server is running on port:', port);
})