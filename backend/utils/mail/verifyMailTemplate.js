const createMessage = (id) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    </head>
    
    <body>
        <div>
            <h1>Welcome to WBL</h1>
            <p>In order to verify your account please click the button submitted bellow</p>
            <a target="_blank" href="http://localhost:3001/verify/${id}">
                <button>VERIFY ME</button>
            </a>
            
        </div>
    </body>
    </html>`
    
}

module.exports = {createMessage};