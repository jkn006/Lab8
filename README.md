# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   We should fit our automated tests so that they run whenever our code is pushed.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   We would not want to use unit tests for the message feature of a messaging application because of the fact that the message feature requires that two users interact with one another. Unit tests in this case would not be good as unit testing does not do a good job of testing interaction between different parts of a system which in this case would be sending and recieving messages.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters.
   In this case, unit testing would be a good idea because a max message length feature would be a feature that is isolated and contained within one feature. Unit tests are great here because they allow for ease of testing and there is only one thing in one location to test.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   The headless tests would run but because the headless parameter specifies that the browser UI is not loaded, this means that when our tests are run, we would not see the process of the UI being tested in our browser. If headless were set to be true, it would be similar to unit testing in that the test would run and the results would show but there would be no in between process.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
    In the callback, we could use the page click function in order to click onto the settings button to navigate to the settings page of our web app. In this case, we would pass the selector for the settings button to the click function so that the test will automatically click onto the settings button which should redirect the beginning of each test to the settings page.
