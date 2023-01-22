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
            <h1>Witaj w serwisie WBL</h1>
            <p>W celu weryfikacji twojego konta kliknij poniższy przycisk:</p>
            <a target="_blank" href="https://wbl.klebiedzinski.pl/api/user/verifyUser/${id}">
                <button>ZWERYFIKUJ</button>
            </a>
            
        </div>
    </body>
    </html>`
    
}

module.exports = {createMessage};