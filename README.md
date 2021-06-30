# CareerFoundry Mentor Booking App

As a student
I want to book a call with my mentor
So that I can have a mentoring session during my course
API documentation: https://cfcalendar.docs.apiary.io/

### Scenario 1:

Given I'm in the calendar page
When I click on a date
Then I see all the time slots containing the available and already allocated call sessions

### Scenario 2:

Given I have chosen a date on the calendar page
When I click on a free time slot
Then I see a field where I type the reason for the call
And I click on the button Confirm Call
Then I see a confirmation message with the date, time, and reason for my call

### Scenario 3:

Given I have chosen a date in the calendar page
When I click on a time slot that has already been allocated to a call Then I see an error message about the allocated
slot

##

In the project directory, you can run:

### DB / Hosting

The project uses supabase postgreSQL database for saving data. To run the project, create a supabase account account and link your account to the project. The project looks for the "timeslots" table with the following columns:

-   id - Primary key - autoincrement
-   date - date - not null
-   slots - time - not null

### `yarn start` - Starts the local server

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Required Backend Routes

GET - Get /mentors/agenda (already implemented by the provided API)
GEt - /mentors/booked (Route that provide all times already booked for a particular mentor)
POST - /mentors/book (save date, time and reason for a call to database)
