# Blackberg Group - USWDS Coding Challenge

This project is a coding challenge that utilizes the U.S. Web Design System (USWDS) to create a responsive and accessible website following best practices.

View live demo: [https://bg-test-xi.vercel.app/](https://bg-test-xi.vercel.app/)

### Key Features
- Responsive layout compatible with all major devices and screen sizes.
- Accessibility enhancements to ensure all users can navigate and interact with the website effectively.

### Additional Notes
The project incorporates optimized assets to ensure quick load times and a smooth user experience. Standard system fonts have been used due to licensing constraints.

## Project Structure

The project follows a standard structure with source files in the `src` directory and production-ready files in the `dist` directory.

- `src`: Contains all the source files including HTML, SCSS, and JavaScript.
- `dist`: Contains the compiled and minified files ready for deployment.

## Development Setup

To set up the project for development, you'll need Node.js and npm installed on your machine. Then follow these steps:

1. Clone the repository:

  ```bash
    git clone https://github.com/rburmeister/bg-test.git
  ```

2. Navigate to the directory where you cloned the project

  ```bash
    cd bg-test
  ```

3. Install the dependencies 

  ```bash
    npm install
  ```

4. Start the development server

  ```bash
    npm run start
  ```

This command will compile SCSS files, watch for changes, and launch a local server with live reloading. Once the server is running, head to [http://localhost:3000/](http://localhost:3000/)

## Building for Production

To create a production build run:

 ```bash
 npm run build
 ```

This command will compile SCSS files, minify CSS and JavaScript, and copy all assets to the dist folder, ready for deployment.

## Deployment

After building the project for production, the contents of the dist directory can be deployed to any static file hosting service.

## Closing Thoughts

Thank you for taking the time to review my project. I enjoyed the challenge and the opportunity to demonstrate my skills. I am excited about the possibility of bringing my passion and expertise to your team.