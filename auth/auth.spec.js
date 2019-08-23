const db = require("../database/dbConfig.js");
const request = require("supertest");
const User = require("./authModel");
const server = require("./auth-router");
const jokes = require("../jokes/jokes-router");

describe("users model", () => {
  beforeEach(async () => {
    
    await db("users").truncate();
  });
  // cross-env DB_ENV=testing
  describe("insert function", () => {
    it("inserts users into the db", async () => {
      const UserNumber = await db("users");
      expect(UserNumber).toHaveLength(0);
      await User.add({ username: "hello", password: "hey" });
      expect(UserNumber).toHaveLength(0);
    });
  });
  describe("insert function", () => {
    it("inserts users into the db", async () => {
      const UserNumber = await db("users");
      expect(UserNumber).toHaveLength(0);
      await User.findBy({ username: "hello", password: "hey" });
      expect(UserNumber).toHaveLength(0);
    });
  });
  describe('POST /users', function() {
    it('responds with json', function() {
      request(server)
        .post('/register')
        .send({username: 'john',password:'john'})
      
        .expect('Content-Type', /json/)
        .expect(201)
       
    });
  });
  describe('POST /users', function() {
    it('responds with json', function() {
      request(server)
        .post('/login')
        .send({username: 'john',password:'john'})
      
        .expect('Content-Type', /json/)
        .expect(201)
       
    });
  });
  describe('POST /users', function() {
    it('responds with json', function() {
      request(jokes)
        .get('/jokes')
     
      
        .expect('Content-Type', /json/)
        .expect(201)
       
    });
  });
});