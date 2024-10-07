# FlavorEase

This project was bootstrapped with [Create React App].

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### `npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Project Structure

This project includes both a frontend and a backend. Here are the steps to run it locally:

### Backend Setup

1. **Navigate to the backend directory:**
   cd backend

2. **Install server dependencies:**
   npm install

3. **Create a `.env` file and add your environment variables:**
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. **Start the backend server:**
   npm start

### Frontend Setup

1. **Navigate to the frontend directory:**
   cd frontend

2. **Install client dependencies:**
   npm install
   
3. **Start the frontend development server:**
   npm start
   
Your backend server will be running on [http://localhost:5000](http://localhost:5000) and the frontend on [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the app for production:

1. **Build the frontend:**
   cd frontend
   npm run build

2. **Run the backend server in production mode:**
   cd ../backend
   npm run start:prod
   

## Deployment

To deploy this application, you can use platforms like Heroku, Vercel, or Netlify. Refer to their documentation for detailed deployment steps.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Contact

- **Darshan Chavda**
- **Email:** darshanchavda1505@gmail.com
- **LinkedIn:** [Darshan Chavda](https://www.linkedin.com/in/darshan-chavda-9097a7245/)