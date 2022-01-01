// create the manager card
const createManager = function(manager) {
    return `
    <div class="col-4">
        <div class="card">
            <div class="card-header">
                <h3>${manager.name}</h3>
                <h4><i class="fas fa-mug-hot"></i> Manager</h4>
            </div>

            <div class="card-body">
                <p class="id">ID: ${manager.id}</p>
                <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="officeNumber">Office Number: ${manager.officeNumber}</p>
            </div>
        </div>
    </div>
    `;
};

// create the engineer card
const createEngineer = function(engineer) {
    return `
    <div class="col-4">
        <div class="card">
            <div class="card-header">
                <h3>${engineer.name}</h3>
                <h4><i class="fas fa-glasses"></i> Engineer</h4>
            </div>

            <div class="card-body">
                <p class="id">ID: ${engineer.id}</p>
                <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                <p class="github">GitHub: <a href="https://github.com/${engineer.github}" target="_blank" rel="noopener noreferrer">${engineer.github}</a></p>
            </div>
        </div>
    </div>
    `;
};

// create the intern card
const createIntern = function(intern) {
    return `
    <div class="col-4">
        <div class="card">
            <div class="card-header">
                <h3>${intern.name}</h3>
                <h4><i class="fas fa-user-graduate"></i> Intern</h4>
            </div>

            <div class="card-body">
                <p class="id">ID: ${intern.id}</p>
                <p class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
                <p class="school">School: ${intern.school}</p>
            </div>
        </div>
    </div>
    `;
};

// pulls all the data into one function so that multiple cards of the same role can be created
createHTML = (data) => {
    htmlArray = [];

    // tracks how many cards to create with the data
    for (let i=0; i < data.length; i++) {
        const employee = data[i];
        // defines which role to use
        const role = employee.getRole();

        if (role === 'Manager') {
            // create manager card with data and html code above
            const managerCard = createManager(employee);
            // push the manager card data into the array
            htmlArray.push(managerCard);
        }

        if (role === 'Engineer') {
            // create engineer card with data and html code above
            const engineerCard = createEngineer(employee);
            // push the engineer card data into the array
            htmlArray.push(engineerCard);
        }

        if (role === 'Intern') {
            // create intern card with data and html code above
            const internCard = createIntern(employee);
            // push the intern card data into the array
            htmlArray.push(internCard)
        }
    }

    // joining all the strings together to create the cards
    const allTeamCards = htmlArray.join('');

    // takes the cards and pushes them to the function to create the HTML page
    const generateTeam = createHTMLPage(allTeamCards);
    return generateTeam;
}

// function to create and generate the HTML page using the cards created above
const createHTMLPage = function(allTeamCards) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Team Profile Page</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
      <link rel="stylesheet" href="style.css" />
    </head>

    <body>
        <header>
            <section class="navbar">
                <h1 class="header-text">My Team</h1>
            </section>
        </header>

        <main>
            <div class="container">
                <div class="row justify-content-center" id="cards">
                    ${allTeamCards}
                </div>
            </div>
        </main>
    </body>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    `;
}

// export to the index file
module.exports = createHTML;