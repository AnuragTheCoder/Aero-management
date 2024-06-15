# Airline Management System

Welcome to the Airline Management System project! This repository hosts a full-stack web application that allows users to manage their airline travel efficiently. By using this application, users can search for flights, book tickets, and cancel reservations, all with a secure authentication system.

## Features

- **User Authentication**: Secure registration and login system.
- **Flight Search**: Search for available flights based on departure and arrival cities, and preferred departure time.
- **Flight Booking**: Book flights and receive booking confirmations.
- **Booking Cancellation**: Cancel bookings easily and get notified of the changes.
- **Interactive UI**: User-friendly interface for a seamless experience.

## Getting Started

### Prerequisites

- Python 3.7+
- Node.js
- React
- Express
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AnuragTheCoder/Aero-management.git
    cd Aero-management
    ```

2. Set up the backend:
    - Navigate to the `backend` directory:
      ```bash
      cd backend
      ```
    - Install the required packages:
      ```bash
      npm install
      ```
    - Start the server:
      ```bash
      nodemon server.js
      ```

3. Set up the frontend:
    - Navigate to the `airline` directory:
      ```bash
      cd ../airline
      ```
    - Install the required packages:
      ```bash
      npm install
      ```
    - Start the frontend server:
      ```bash
      npm start
      ```

4. Update CORS settings:
    - Ensure your React app URL is correctly set in the CORS settings of `app.js`. If you are running on `localhost` ports `3000`, `3001`, `3002`, or `3003`, you should not encounter any issues.

### Usage

1. Open your web browser and navigate to the React frontend URL, typically `http://localhost:3000`.

2. Register a new user account or log in with existing credentials.

3. Search for flights by entering the departure and arrival cities, and the desired departure time.

4. Book a flight from the search results.

5. Manage your bookings by viewing booked flights and canceling if necessary.

## Project Structure

- `backend/`: Contains the Express server and Mongoose models for managing the backend functionality.
- `airline/`: Contains the React frontend application for user interactions.
- `app.js`: Main backend application script with CORS settings.
- `server.js`: Script to start the backend server.

## Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the open-source community for the tools and libraries used in this project.

## Contact

If you have any questions, feel free to reach out:

- GitHub: [AnuragTheCoder](https://github.com/AnuragTheCoder)
- Email: youremail@example.com

Enjoy managing your airline travels! ✈️

### Screenshots

#### Home Page
![Home Page](screenshots/1.png)

#### Search Flights
![Search Flights](screenshots/2.png)

#### Book Flight
![Book Flight](screenshots/3.png)

#### Manage Bookings
![Manage Bookings](screenshots/4.png)

#### Admin To Add Flights
![Manage Bookings](screenshots/5.png)

#### Update Added Flights
![Manage Bookings](screenshots/6.png)


## Live Demo

