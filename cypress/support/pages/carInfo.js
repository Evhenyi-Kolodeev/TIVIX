import PageObject from "../PageObject";
let i = Math.floor(Math.random() * 10) + 1;

export default class carInfoList extends PageObject{

  get resultsList() {
    return cy.get('#search-results');
  };
  
  get allInfo() {
    return cy.get(`tbody > :nth-child(${i})`);
  };

  get licensePlate() {
    return cy.get('.card-body > :nth-child(4)');
  };

  get pricePerDay() {
    return cy.get('.card-body > :nth-child(2)');
  };

  get rentBtn() {
    return cy.get(`tbody > :nth-child(${i}) > :nth-child(7)`);
  };

  get rentBtnInfo() {
    return cy.get('.btn').contains('Rent!');
  };

  checkCarInfo() { 
    this.allInfo //collect all info about car and compare
      .should('exist') //should dispay car info
      .invoke('text') //invoke text for compare with the next page
      .then((text1) => {
        this.rentBtn
          .click()
        
        cy.get('.card-header') //check model
          .invoke('text')
          .then(text => text.replace(/\n/, ''))
          .should((text2) => {
            expect(text1).to.contain(text2)
          })

        cy.get('.card-title') //check company name
          .invoke('text')
          .then(text => text.replace(/Company:|\n/, ''))
          .should((text2) => {
            expect(text1).to.contain(text2)
          })

        this.pricePerDay //check price per day
          .invoke('text')
          .then(text => text.replace(/Price per day: |\n/, ''))
          .should((text2) => {
            expect(text1).to.contain(text2)
          })

        this.licensePlate //check License plate
          .invoke('text')
          .then(text => text.replace(/License plate: |\n/, ''))
          .should((text2) => {
            expect(text1).to.contain(text2)
          })
      });
  };
};
