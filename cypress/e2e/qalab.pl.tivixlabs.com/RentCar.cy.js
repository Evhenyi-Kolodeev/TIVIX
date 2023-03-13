import searchFormObject from "../../support/pages/searchForm";
import carInfoList from "../../support/pages/carInfo";
import summaryForm from "../../support/pages/summaryPage"; 

/// <reference types="cypress" />
/// <reference types="../support" />

const searchForm = new searchFormObject();
const carInfo = new carInfoList();
const summaryInfo = new summaryForm();

let allCarInfo;

describe('Test suite 1', () => {
  let dates;
  let user;

  beforeEach(() => {
    cy.visit('/');
  });

  it('Search page should contain main elements', () => {
    cy.contains('a', 'Search')
      .should('have.attr', 'href', '/'); //link to Search page in the header
  
    cy.contains('.alert-danger', 'Please fill pickup and drop off dates')
      .should('exist');//should contain allert about pick-up & drop-off dates
      //[typo]: pickup & drop off CHANGE TO pick-up & drop-off

    cy.get('#search_form')
      .should('exist'); //should contain search form

    searchForm.checkSearchFormElements();//should contain all elements in search form
  });

  before(() => {
    cy.task('newDates').then(newDates => {
      dates = newDates;
    });

    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it(`"Card number" field should accept digits`, () => {

    searchForm.pickupDateField
      .type(dates.pickup);//enter pick-up date

    searchForm.dropofDateField
      .type(dates.dropoff);//enter drop-off date

    searchForm.searchBtn
     .click();//should redirect to the results list page

    carInfo.checkCarInfo(); //chose random car and compare car info with the details page

    carInfo.rentBtnInfo
      .click();//should redirect to the summary page
    
    summaryInfo.fillUpCardNumber
      .type(user.cardNumber);//should fill up card number

    summaryInfo.rentBtnSummary
      .click();

    summaryInfo.rentForm //should check error messages
    .should('contain', summaryInfo.errors.name)
    .should('contain', summaryInfo.errors.lastName)
    .should('contain', summaryInfo.errors.email)
    .should('not.contain', summaryInfo.errors.cardNumber)
  });

  before(() => {
    cy.task('newDates').then(newDates => {
      dates = newDates;
    });
  });

  it('The user should be able to change the drop-off date on the Results page',() =>{
    cy.visit(`${searchForm.searchUrl}${dates.pickup}&dropoff=${dates.dropoff}`);
    //visit results page with set pick-up & drop-off dates

    searchForm.dropofDateField
      .type(dates.newDropoff);//should set a new drop-off date

      searchForm.searchBtn
      .click();//should show the new results 
    
    searchForm.dropofDateField
      .should('not.contain', dates.dropoff);//check if the new drop-off date is set

  });

  it('Summary info should appear on the Rent form page',() => {
    cy.visit(`${searchForm.searchUrl}${dates.pickup}&dropoff=${dates.dropoff}`);
    //visit results page with set pick-up & drop-off dates

    searchForm.searchBtn //should show the results
      .click(); 

    carInfo.allInfo //save car info into ver
      .then(($value) => {
        allCarInfo = $value.text()
      })

    carInfo.rentBtn //should redirect to the details page
      .click();

    carInfo.rentBtnInfo //should redirect to the summary page
      .click();
      
    summaryInfo.checkCompanyName() // check company name 
      .should((companyName) =>
        expect(allCarInfo).to.contain(companyName)
      );
    
    summaryInfo.checkPricePerDay() // check price per day 
      .should((pricePerDay) =>
        expect(allCarInfo).to.contain(pricePerDay)
      );

    summaryInfo.checkLicensePlate() // check price per day 
      .should((licensePlate) =>
        expect(allCarInfo).to.contain(licensePlate)
      );

    summaryInfo.allContent
      .should('contain', dates.pickup)
      .should('contain', dates.dropoff);
    
  });
});
