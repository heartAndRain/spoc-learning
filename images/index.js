var fs = require('fs')

fs.readFile('./default_avatar.png', (err, buffer) => {
    console.log(buffer)
})