const express = require('express');
const path = require('path');
const port = 8000;

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
    return response.render('home', {
        title: "My Contacts List",
        contact_list: contactList
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

    contactList.push(request.body);
    return response.redirect('back');
});

//for deleting a contact
app.get('/delete-contact', function(request, response){
    //get the query from the url
    let phone = request.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return response.redirect('back');
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log('Yes, server is running on port:', port);
})