/// <reference types="cypress" />

import { beVisible, exist } from '../../support/basics/constants';
import {
  homeTitle,
  okButton,
  selCountryLanguage,
} from '../../support/basics/homePage';

describe('Verify Home page elements', () => {
  it('TC-001. English language should exist, be interactable & visible', () => {
    cy.visit('/');
    cy.getBySelData('countryLanguageSelector').should(exist).click();
    cy.get('.css-8f7wnq-control')
      .eq(1)
      .click()
      .then(() => {
        cy.contains(selCountryLanguage.language[5]).should(exist).click();
      });

    // Verify switched to Spanish
    cy.contains('button', okButton).click();
    cy.location('pathname').should('include', '/es');
    cy.contains(homeTitle).should(beVisible);
  });
});
