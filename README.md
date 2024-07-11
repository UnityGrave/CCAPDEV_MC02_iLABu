# Lab Reservation System - iLABu

The Lab Reservation System is a web application designed to manage computer laboratory slot (seat) reservations. The system includes multiple computer labs and provides a user-friendly interface for students and lab technicians to view, reserve, and manage lab slots.

## Project Features

- **View Slot Availability**
  - Users can choose a computer lab and see the current available seats.
  - Users can view availability for the next 7 days.
  - Users can see who reserved a seat, unless the reservation is anonymous. Clicking on a user’s name links to their profile.
  - Availability updates periodically without requiring page refresh.

- **Register**
  - Visitors must register to reserve lab slots using their DLSU email and a password.
  - Two types of accounts: student and lab technician.

- **Login**
  - Registered users can log in to reserve slots.
  - Option to be “remembered” by the website, extending the session period by 3 weeks with each login.

- **Logout**
  - Users can log out, which clears the session and ends the “remember” period.

- **Reserve Slots**
  - Students can reserve available slots in 30-minute intervals.
  - Option to reserve anonymously.
  - Multiple slots can be reserved in one reservation.
  - Students cannot reserve previously reserved slots.

- **Reserve for a Student**
  - Lab technicians can make reservations for walk-in students.

- **Remove Reservation**
  - Lab technicians can remove reservations if students do not show up within 10 minutes of the reserved time.

- **Edit Reservation**
  - Students can edit their reservations.
  - Lab technicians can edit any reservations.

- **View Reservations**
  - Users can view their reservations, including details such as seat number, lab, date, and time.

- **View / Edit User Profile**
  - Registered users can edit their profile, including a profile picture and description.
  - Profiles list current reservations.
  - Users can view other public profiles but cannot edit them.

- **Delete User Account**
  - Students can delete their accounts, canceling any pending reservations.

- **Search for Users / Free Slots**
  - Users can search for available slots by date, time, and lab.

- **General**
  - Emphasis on good user experience and visual design.
  - Easy navigation and cohesive theme throughout the application.

## Project Phases

### Phase 1: Front-End Development
- **Description:** Build the initial front-end version of the site using HTML, CSS, and JavaScript.
- **Deadline:** June 7, 2024
- **Goals:**
  - Develop the layout and design of the website.
  - Implement the user interface for viewing and reserving lab slots.
  - Create registration, login, and profile management pages.
  - Ensure a responsive and visually appealing design.

### Phase 2: Back-End Development and Deployment
- **Description:** Integrate Node.js and MongoDB to add server-side functionality and database management. Deploy the website.
- **Deadline:** TBA (To Be Announced)
- **Goals:**
  - Set up a server using Node.js to handle user requests and reservations.
  - Implement a MongoDB database to store user data, reservations, and lab availability.
  - Ensure secure user authentication and authorization.
  - Deploy the web application to a cloud platform or web server.
  - Optimize the application for performance and scalability.
