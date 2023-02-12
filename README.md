# **Lithium Full Stack Engineer Tech Test**

This is a tech test for the role of full stack engineer at Lithium. We are somewhat tech agnostic, so feel free to use the tools, frameworks and packages you like. Although we are quite flexible in our tech choices, the language **must** be TypeScript for both the front end and back end, and the front end must be either React or NextJS (or a similar React-based meta-framework). At the end of the test you will be asked to explain your choices.

## The Task

Lithium are expanding our system, and would like a portal for users to log in to. Before they log in though, they will need to be able to create an account. You will therefore need to create a back end to handle account creation and logging in, and the front end to enable them to create an account and log in. Once logged in, you just need to display "Hey `(user's full name)`!"

**Submission**

To start the test, please make an empty repo on your own personal GitHub with this readme file in the route directory and begin building the full stack app outlined above. Pushing at different intervals in the test will help us get an idea into your process, so please aim to do this. Don't feel pressure though - at Lithium we value speed, but understand this test will need to be undertaken in your own time and around other commitments, so rest assured the time, duration and frequency of these pushes **will not** be taken into consideration. That said, we will expect your submission to be completed no later than 5 days after receiving it.

**What we're looking for**

This role will involve a fair level of independence - the right candidate will be able to own a feature from start to finish. This is why the choices of tech are left fairly open - we want to see you use your intuition and how you approach a problem.

This is a full stack role, so please aim to make your submissions look _decent_. That being said, this is not a design job that you are applying for, so don't spend too long making it as beautiful as it can be - just try and use our current site's branding as a guideline and have your submission feel like it belongs.

## When you've finished coding

After you have completed the task, please send us a .zip file of the repo, but fill in the section below, keeping this file in the root directory:

**Your name**

`Sandro Kakashvili`

**Why did you choose the tech you did?**

`I chose Nest.js as the server framework because of its modular structure and ability to handle a large number of requests efficiently. Nest.js provides a powerful set of libraries and tools that make it easy to create scalable and maintainable server applications. It also provides a clean and intuitive way to organize the codebase, which makes it easy to work with and extend. Also it brings Typescript support out of the box, which is a great plus.

I chose PostgreSQL as the database because of its reliability and ability to handle complex data structures. It also has great support for data relationships, making it a good choice for building scalable applications. I used TypeORM as an ORM to interact with the database, as it provides a clean and efficient way to manage database operations and maintain the data model.

JWT and Passport were chosen for authorization and authentication as they are well-established, secure and flexible solutions. JWT provides a way to securely transmit user information between the client and server, while Passport provides a convenient way to integrate multiple authentication strategies into the application.

For sending email verification links and reset password links, I used Sendgrid as the mail service. It provides a simple and effective way to send emails and has a robust infrastructure to ensure delivery of emails. I used the MJML library for styling the emails, as it provides an easy-to-use, responsive and customizable framework for creating beautiful emails.

On the client side, I chose React.js with Typescript as it is a popular and powerful combination for building interactive and responsive user interfaces. Axios was used for making requests to the server, as it provides a simple and efficient way to make HTTP requests. I used the YUP library for form validation, as it provides a concise and flexible way to validate user input. For the form, I used the react-hook-form package, as it provides a clean and intuitive way to manage forms in React.

For design, I used the Material UI library as it provides a comprehensive set of pre-designed components that follow the Material Design guidelines. This made it easy to create a visually appealing and consistent design throughout the application.`
