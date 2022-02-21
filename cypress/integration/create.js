
let rowsLength;
describe ('create account by taking  excel data', () =>{
  before(() => 
  {
     cy.task('readXlsx', { file: 'cypress/fixtures/createData.xlsx', sheet: "Sheet1" }).then((rows) => {
        rowsLength = rows.length;
        cy.writeFile("cypress/fixtures/createData.json", {rows})
      })
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account');
      })

   



    it ('Data Driven: create User', () => {

      
      cy.fixture('createData','excelData').then((data) => {
         for ( let i = 0; i < rowsLength; i++) {
            // cy.get('.btn-link').click();
            cy.url().should('include', '/index.php?controller=authentication&back=my-account').then(()=>{
            // cy.get('input[formcontrolname="firstName"]').type(data.rows[i].firstName);
            // cy.get('input[formcontrolname="lastName"]').type(data.rows[i].lastName);
            cy.get("input[id='email_create']").type(data.rows[i].email);
            
            cy.get("button[name='SubmitCreate']").click()
            cy.wait(3000)
            cy.get("input[name='customer_firstname']").type(data.rows[i].firstname);
            cy.get("input[name='customer_lastname']").type(data.rows[i].lastname);
            cy.get("input[name='passwd']").type(data.rows[i].pw);
            cy.get("input[name='address1']").type(data.rows[i].address);
            cy.get("input[name='city']").type(data.rows[i].cityname);
            cy.get("input[name='postcode']").type(data.rows[i].pc);
            cy.get("input[name='phone_mobile']").type(data.rows[i].phno);
            const rndInt = Math.floor(Math.random() * 6) + 1
            cy.get('#id_state').select(rndInt)
            cy.get('#id_state').should('have.value', rndInt)
            // cy.get('select[name="id_state"]').select('Colorado').should('have.text', 'Colorado')
            // cy.wait(2000) 
             cy.get("button[name='submitAccount']").click()
            // cy.wait(6000)
            // cy.get("div[class='header_user_info']").eq(1).click()
            // cy.get('alert').should('have.text', data.rows[i].message);
            
          })
        }
      })
      
  

     })

    })