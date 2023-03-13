import PageObject from "../PageObject";
let searchUrl;

export default class searchFormObject extends PageObject{

  get countryField() {
    return cy.get('#country');
  };
  get cityField() {
    return cy.get('#city');
  };
  get modelField() {
    return cy.findByPlaceholder('Model');
  };
  get pickupDateField() {
    return cy.get('#pickup');
  };
  get dropofDateField() {
    return cy.get('#dropoff');
  };
  get searchBtn() {
    return cy.get('.btn').contains('Search');
  };
  get searchUrl() {
    return searchUrl = `http://qalab.pl.tivixlabs.com/?country=3&city=3&model=&pickup=`;
  };

  checkSearchFormElements() {
    this.countryField
      .should('exist'); //should contain country dropdown menu
  
    this.cityField
      .should('exist'); //should contain city dropdown menu
  
    this.modelField
      .should('exist'); //should contain model field
  
    this.pickupDateField
      .should('exist'); //should contain pick-up date field
  
    this.dropofDateField
      .should('exist'); //should contain drop-off date field

    this.searchBtn
      .should('exist'); //should contain Search button
  }
};
