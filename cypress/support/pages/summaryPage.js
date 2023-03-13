import PageObject from "../PageObject";

let errors;

export default class summaryForm extends PageObject{
  
  get fillUpCardNumber() {
    return cy.findByPlaceholder('Card number');
  };

  get rentBtnSummary() {
    return cy.get('.btn').contains('Rent');
  };

  get rentForm() {
    return cy.get('#rent_form');
  }

  get companyName() {
    return cy.get('.card-title') //check company name
  }

  get pricePerDay() {
    return cy.get('.col-md-4 > :nth-child(3)');
  };

  get licensePlate() {
    return cy.get('.col-md-4 > :nth-child(5)');
  };

  get allContent() {
    return cy.get('#content');
  }

  get errors() {
    return errors = {
      name: 'Name is required',
      lastName: 'Last name is required',
      email: 'Email is required',
      cardNumber: 'Card number is required',
    };
  }
  checkCompanyName () {
    return this.companyName //collect company name
      .should('exist') //should dispay car info
      .invoke('text') //invoke text for compare with saved info
      .then(text => text.replace(/Company: |\n/, ''))
  };
  
  checkPricePerDay () {
    return this.pricePerDay
      .invoke('text') 
      .then(text => text.replace(/Price per day: |\n/, ''))
  };

  checkLicensePlate () {
    return this.licensePlate
      .invoke('text') 
      .then(text => text.replace(/License plate: |\n/, ''))
  };
};
