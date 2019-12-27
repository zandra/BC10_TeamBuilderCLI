const fs = require('fs');
const fsPromises = require('fs').promises;

const managerHTML = emp => `
    <div class="card card-manager">
      <div class="card-content__header "><span class="card-title">${emp.name}</span>
        <p>Manager</p>
      </div>
      <div class="card-content__main">
        <ul>
          <li id="id">Id: ${emp.id}</li>
          <li id="email">Email: ${emp.email}</li>
          <li class="li-manager" id="room">Office: ${emp.officeNumber}</li>
        </ul>
      </div>
    </div>
            `;

const pmHTML = emp => `
      <div class="card card-pm">
      <div class="card-content__header hoverable"><span class="card-title">${emp.name}</span>
        <p>${emp.role}</p>
      </div>
      <div class="card-content__main">
        <ul>
          <li id="id">Id: ${emp.id}</li>
          <li id="email">Email: ${emp.email}</li>
          <li class="li-pm" id="room">Department: ${emp.department}</li>
        </ul>
      </div>
    </div>     
   `;

const engineerHTML = emp => `
    <div class="card card-engineer">
    <div class="card-content__header"><span class="card-title">${emp.name}</span>
      <p>${emp.role}</p>
    </div>
    <div class="card-content__main">
      <ul>
        <li id="id">Id: ${emp.id}</li>
        <li id="email">Email: ${emp.email}</li>
        <li class="li-manager" id="room">Github: ${emp.github}</li>
      </ul>
    </div>
    </div> 
  `;

const internHTML = emp => `
    <div class="card card-intern">
      <div class="card-content__header"><span class="card-title">${emp.name}</span>
        <p>${emp.role}</p>
      </div>
      <div class="card-content__main">
        <ul>
          <li id="id">Id: ${emp.id}</li>
          <li id="email">Email: ${emp.email}</li>
          <li class="li-manager" id="room">College: ${emp.school}</li>
        </ul>
      </div>
  </div>  
  `;

async function writePage() {
  try {
    const manTxt = fsPromises.readFile('./dist/manager.html');
    const pmTxt = fsPromises.readFile('./dist/pm.html');
    const engTxt = fsPromises.readFile('./dist/engineer.html');
    const intTxt = fsPromises.readFile('./dist/intern.html');
    const [manCard, pmCard, engCard, intCard] = await Promise.all([
      manTxt,
      pmTxt,
      engTxt,
      intTxt,
    ]);

    const pageHTML = `<!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Main Profile</title>
        <link rel="stylesheet" href="css/main.css">
      </head>

      <body>
        <div class="container">
          <div class="header">
            <h2 class="text-white">My Team</h2>
          </div>
          <div class="main">
          <div class="card-container">
              <!-- Insert the cards here -->
              ${manCard}
              ${pmCard}
              ${engCard}
              ${intCard}
              <!-- End card container -->
            </div>
            </div>
          </div>
        </div>
      </body>
      </html>`;

    fs.writeFileSync('./dist/main.html', pageHTML, err => {
      if (err) console.log(err);
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports.managerHTML = managerHTML;
module.exports.pmHTML = pmHTML;
module.exports.engineerHTML = engineerHTML;
module.exports.internHTML = internHTML;
module.exports.writePage = writePage;
