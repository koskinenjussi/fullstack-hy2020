const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.xsahl.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length > 3) {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    contact.save().then(response => {
        console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Contact.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(contact => {
            console.log(contact.name, contact.number)
        })
        mongoose.connection.close()
    })
}

