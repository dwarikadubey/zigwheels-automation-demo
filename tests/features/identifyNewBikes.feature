Feature: Identify New Bikes on ZigWheels

  Scenario: Display upcoming Honda bikes under 4 Lac
    Given I am on the ZigWheels upcoming honda bikes page
    And I filter bikes with price less than 4 Lac
    Then I should see a list of upcoming Honda bikes with their name, price, and expected launch date

  Scenario: Extract used car models in Chennai
    Given I am on the ZigWheels used cars page for Chennai
    When I view the list of popular used car models
    Then I should see all popular models displayed in a list

  Scenario: Capture error message on invalid Google login
    Given I am on the ZigWheels login page
    When I try to login with Google using invalid account details
    Then I should see an error message for invalid login

  Scenario: Handle windows and frames
    Given I am on a page with multiple windows or frames
    When I switch between windows and frames
    Then I should be able to interact with elements in each window or frame

  Scenario: Fill simple form and capture warning message
    Given I am on a form page
    When I submit the form with invalid or incomplete data
    Then I should see a warning message

  Scenario: Extract menu items from frames
    Given I am on a page with menu items inside frames
    When I extract the menu items
    Then I should store the menu items in a collection

  Scenario: Navigate back to home page
    Given I am on any page of the site
    When I click the home button or link
    Then I should be navigated back to the home page

  Scenario: Capture performance metrics
    Given I am running automated tests
    When I measure response time, throughput, and error rate
    Then I should capture and report these performance metrics

  Scenario: Accessibility testing
    Given I am on any page of the site
    When I perform accessibility checks
    Then the site should be compatible with screen readers and keyboard navigation

  Scenario: Parallel test execution
    Given I have multiple test scenarios
    When I execute tests in parallel
    Then all tests should run successfully without interference

  Scenario: Follow Page Object Model
    Given I am writing automation scripts
    When I implement the Page Object Model
    Then my code should be modular and maintainable
