/// <reference types="cypress" />

import { beVisible, exist } from '../../support/basics/constants';
import { selCountryLanguage } from '../../support/basics/homePage';

describe('Verify Home page elements', () => {
  it('TC-001. English language should exist, be interactable & visible', () => {
    cy.visit('/');
    cy.getBySelData('countryLanguageSelector').should(exist).click();
    cy.get('.css-8f7wnq-control')
      .eq(1)
      .click()
      .contains(selCountryLanguage.language[0])
      .should(beVisible)
      .click();
  });
});
