import {request } from "supertest"
import { mongoose } from "mongoose";
import {bcrypt} from "bcrypt";
import app from "../app.js";
import User from "../models/userModels.js";



describe('Authentication Routes', () => {

  // Clear the database before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Disconnect from the database after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /register', () => {
    test('should register a new user with valid data', async () => {
      const userData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      };

      // Make the request to the registration endpoint
      const response = await request(app)
        .post('/register')
        .send(userData);

      // Expect the status to be 201 (Created)
      expect(response.statusCode).toBe(201);

      // Confirm a token is returned in the response
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');

      // Check that the user is saved in the database
      const user = await User.findOne({ email: userData.email });
      expect(user).toBeDefined();
      expect(user.username).toBe(userData.username);
      expect(user.email).toBe(userData.email);

      // Verify that the password is hashed
      const isPasswordHashed = await bcrypt.compare(userData.password, user.password);
      expect(isPasswordHashed).toBe(true);
    });

    test('should not register a user with duplicate email', async () => {
      const userData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      };

      // Register the first user
      await request(app)
        .post('/register')
        .send(userData);

      // Attempt to register another user with the same email
      const response = await request(app)
        .post('/register')
        .send(userData);

      // Expect the status to be 400 (Bad Request)
      expect(response.statusCode).toBe(400);

      // Confirm the response contains the appropriate error message
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Email already exists');
    });
  });

  describe('POST /login', () => {
    test('should log in a registered user with valid credentials', async () => {
      const userData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      };

      // First, register the user
      await request(app)
        .post('/register')
        .send(userData);

      // Attempt to log in with the correct credentials
      const response = await request(app)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password
        });

      // Expect the status to be 200 (OK)
      expect(response.statusCode).toBe(200);

      // Confirm a token is returned in the response
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    test('should not log in a user with invalid credentials', async () => {
      const userData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      };

      // First, register the user
      await request(app)
        .post('/register')
        .send(userData);

      // Attempt to log in with an incorrect password
      const response = await request(app)
        .post('/login')
        .send({
          email: userData.email,
          password: 'wrongpassword'
        });

      // Expect the status to be 401 (Unauthorized)
      expect(response.statusCode).toBe(401);

      // Confirm the response contains the appropriate error message
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid credentials');
    });
  });

});
