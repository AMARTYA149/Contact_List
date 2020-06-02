const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

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



app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log('Yes, server is running on port:', port);
})