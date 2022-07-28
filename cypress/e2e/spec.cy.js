describe("navigation", () => {
  it("should navigate to home page", () => {
    cy.visit("/");
  });
  it("should navigate to location/topic/all page", () => {
    cy.visit("/Barnet/topic/All");
  });
  it("should navigate to location page showing the location/topic/all page", () => {
    cy.visit("/Barnet");
  });
  it("should navigate to a given indicator page", () => {
    cy.visit("/Barnet/indicator/anxiety");
  });
  it("should navigate to the map page", () => {
    cy.visit("/map");
  });
});

describe("Homepage tests", () => {
  // Footertest
  it("should navigate to ONS webiste ", () => {
    cy.visit("/")
      .get('[data-test-id="ons-logo"]')
      .should("have.class", "w-44")
      .click();
  });
  it("should navigate to ecnmy website", () => {
    cy.visit("/")
      .get('[data-test-id="ecmy-logo"]')
      .should("have.attr", "href", "https://www.ecnmy.org/");
  });
  // Navbar
  it(" navbar Home link should have the right attribute on all pagds ", () => {
    cy.visit("/").get("nav a:nth-of-type(1)").should("have.attr", "href", "/");
    cy.visit("/map")
      .get("nav a:nth-of-type(1)")
      .should("have.attr", "href", "/");
    cy.visit("/Barnet")
      .get("nav a:nth-of-type(1)")
      .should("have.attr", "href", "/");
    cy.visit("/Barnet/indicator/anxiety")
      .get("nav a:nth-of-type(1)")
      .should("have.attr", "href", "/");
  });
  it(" navbar Map link should have the right attribute on all pagds ", () => {
    cy.visit("/")
      .get('[data-test-id="mapNavLink"]')
      .should("have.attr", "href", "/map");
    cy.visit("/map")
      .get('[data-test-id="mapNavLink"]')
      .should("have.attr", "href", "/map");
    cy.visit("/Barnet")
      .get('[data-test-id="mapNavLink"]')
      .should("have.attr", "href", "/map");
    cy.visit("/Barnet/indicator/anxiety")
      .get('[data-test-id="mapNavLink"]')
      .should("have.attr", "href", "/map");
  });
});
