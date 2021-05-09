Feature: Calculates 1 plus 1
  Scenario: Successful
    Given parameters 1 and 1 are provided
    When I sum them
    Then the result I see is 2

  @manual
  Scenario: Errorful
    Given parameters 1 and 2 are provided
    When I sum them
    Then the result I get is 3
