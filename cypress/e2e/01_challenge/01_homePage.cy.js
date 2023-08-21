/// <reference types="cypress" />

import {
  beVisible,
  exist,
  include,
  includeText,
} from '../../support/basics/constants';
import {
  englishHomeTitle,
  navBar,
  okButton,
  selCountryLanguage,
  spanishHomeTitle,
} from '../../support/basics/homePage';

describe('Verify Home page elements', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC_01. Verify default Language is English. Verify default url landing is English', () => {
    // Verify url landing and language is set in English
    cy.location('pathname').should(include, '/en');

    // Verify English language is set in the Selector
    cy.getBySelData('countryLanguageSelector').should(exist).click();
    cy.get('.css-8f7wnq-control')
      .eq(1)
      .contains(selCountryLanguage.language[0])
      .should(beVisible);

    // Verifying all languajes iterating over them
    cy.getBySelData('countryLanguageSelector').click({ force: true });
    cy.get('.css-8f7wnq-control')
      .eq(1)
      .click()
      .then(() => {
        cy.get('.css-13pb2gt-option').each((item, index) => {
          cy.wrap(item).should(includeText, selCountryLanguage.language[index]);
        });
      });

    // Verify Title home page
    cy.contains(englishHomeTitle).should(beVisible);
  });

  it('TC-002. Verify switching language to Spanish. Verify new url landing is Spanish', () => {
    cy.getBySelData('countryLanguageSelector').should(exist).click();
    cy.get('.css-8f7wnq-control')
      .eq(1)
      .click()
      .as('setSpanish')
      .then(() => {
        cy.contains(selCountryLanguage.language[5]).should(exist).click();
      });
    cy.get('@setSpanish')
      .contains(selCountryLanguage.language[5])
      .and(beVisible);

    // Verify switched to Spanish
    cy.contains('button', okButton).click();
    cy.location('pathname').should('include', '/es');
    cy.contains(spanishHomeTitle).should(beVisible);
  });

  it('TC_003. Verify each link on nav bar', () => {
    const { homeTitle, urlNav } = navBar;

    homeTitle.forEach((page, index) => {
      cy.get('#site-header li a')
        .contains(page)
        .click()
        .then(() => {
          cy.location('pathname').should('eq', `/en/${urlNav[index]}/`);
          cy.go('back');
        });
    });
  });
});
