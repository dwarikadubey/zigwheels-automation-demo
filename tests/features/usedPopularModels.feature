Feature: Used Popular Models

  @usedModels
  Scenario: Validate used car model list for Chennai
    Given I navigate to the ZigWheels website
    When I select "Used Cars" and city as "Chennai"
    Then I should see a list of used popular car models
