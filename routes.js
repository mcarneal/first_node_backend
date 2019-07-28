const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    if (url === '/'){
        res.setHeader('content-type', 'text-html')
        res.write("<body><form action='/message' method='POST'><input name='message' type='text'><button type='submit'>Submit!!!!</button></form></body>")
        return res.end()

    }
    if(url === '/message' && method === 'POST'){
        const body = []
        req.on('data', (chunk)=>{
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err)=> {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('content-type', 'text-html')
    res.write('<h1>HI!</h1>')
    res.end()
}

module.exports = requestHandler

