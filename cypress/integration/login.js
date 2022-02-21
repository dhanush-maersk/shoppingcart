// describe('convert data to Json', () => 
// { it('read data from xcel', () =>
//  { 
//    cy.parseXlsx('cypress/fixtures/excelData.xlsx').then( (jsonData) =>
//     { const rowLength = Cypress.$(jsonData[0].data).length
//         console.log(rowLength)
//        for (let i = 0; i < rowLength; i++)
//         { 
//         //   var jsonData = jsonData[index].data 
//         //    console.log(jsonData)
//         // //  cy.writeFile("cypress/fixtures/xlsxData.json", {namemy:jsonData[1][0], password:jsonData[1][1]})
//         //     cy.writeFile("cypress/fixtures/xlsxData.json", {username:jsonData[index].data[0]})

//         // cy.log('Username: ' + jsonData[0].data[i][0]);
//         //         cy.log('Password: ' + jsonData[0].data[i][1]);
//         cy.writeFile("cypress/fixtures/xlsxData.json", { username: jsonData[0].data[i][0], password: jsonData[0].data[i][1] },{flag :'a+'})

//         }
//     })
//  })
// }) 


// describe("Reading Data from newly created json file",function()
// {
//     it("Sample test case of login", function()
//     {
//         cy.visit("http://automationpractice.com/index.php?controller=authentication&back=my-account");
//         cy.fixture('xlsxData').then((user) =>
//         {
//             cy.get("input[class='is_required validate account_input form-control']").eq(1).type(user.username)
//             cy.get("input[name='passwd']").type(user.password)
//         })
//         cy.wait(2000)      
//         cy.get("button[name='SubmitLogin']").click()
//     })
// })



let rowsLength;
describe ('Data Driven Testing Using Excel FIle', () =>{
  before(() => {
     cy.task('readXlsx', { file: 'cypress/fixtures/excelData.xlsx', sheet: "Sheet1" }).then((rows) => {
        rowsLength = rows.length;
        cy.writeFile("cypress/fixtures/xlsxData.json", {rows})
      })
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account');
      })
    it ('Data Driven: Register User', () => {
      cy.fixture('xlsxData').then((data) => {
         for ( let i = 0; i < rowsLength; i++) {
            // cy.get('.btn-link').click();
            cy.url().should('include', '/index.php?controller=authentication&back=my-account').then(()=>{
            // cy.get('input[formcontrolname="firstName"]').type(data.rows[i].firstName);
            // cy.get('input[formcontrolname="lastName"]').type(data.rows[i].lastName);
            cy.get("input[class='is_required validate account_input form-control']").eq(1).type(data.rows[i].username);
            cy.get("input[name='passwd']").type(data.rows[i].password);
            cy.wait(2000) 
            cy.get("button[name='SubmitLogin']").click()

            cy.wait(6000)
            cy.get("div[class='header_user_info']").eq(1).click()
            // cy.get('alert').should('have.text', data.rows[i].message);
          })
        }
      })     
     })
    })