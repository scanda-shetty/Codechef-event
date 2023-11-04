const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 5000

// Set Templating Enginge
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))
app.set('view engine', 'ejs')


// Navigation
app.get('/', (req, res)=> {
    res.render('register')
})

app.post('/', urlencodedParser, [
    check('username', 'This username must be 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const alert = errors.array();
        const errorMessage = alert.map(error => error.msg).join('\n');
        
        // Show an alert with the error message and redirect back to the registration page
        res.send(`<script>alert('${errorMessage}'); window.location = '/';</script>`);
    } else {
        // Redirect to 'endPage.ejs' on success
        res.redirect('/endPage');
    }
});


app.listen(port, () => console.info(`App listening on port: ${port}`))