import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('User Tests', () => {
  let Usertoken ;
  let AdminToken;
  it('it should return validation error', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return confirm password error', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'johnsdfg@gmail.com',
      password:'aPassword123!',
      confirmPassword:'inhgfdka'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return password strength', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'kwizera',
      confirmPassword:'kwizera'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return account created', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('it should return account already exits', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });
  
  it('it should validation error', (done) => {
    const user = {
      email: 'john45gmail.com',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should Login successfuly', (done) => {
    const user = {
      email: 'kabundege2@outlook.com',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        AdminToken = res.body.data.token;
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should Login successfuly', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        Usertoken = res.body.data.token;
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should return incorect password', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 'kwizer4567a',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should User not found', (done) => {
    const user = {
      email: 'isajhhjc@gmail.com',
      password: 'kwizera',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

  it('it should validation error', (done) => {
    const user = {
      email: 'john45gmail.com',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should email sent successfully', (done) => {
    const user = {
      email: 'kabundege2@outlook.com'
    };
    chai
      .request(app)
      .post('/api/v1/auth/email')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should Email not found', (done) => {
    const user = {
      email: 'christora@gmail.com'
    };
    chai
      .request(app)
      .post('/api/v1/auth/email')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('it should Email not found', (done) => {
    const user = {
      email: 'christoragmail.com'
    };
    chai
      .request(app)
      .post('/api/v1/auth/email')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should return old token', (done) => {
      const newAcc = {
        password:"kwizera"
      };
      chai
      .request(app)
      .patch(`/api/v1/auth/reset/${process.env.Old_token}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('checking old token', (done) => {
    const newAcc = {
      token : process.env.Old_token
    };
    chai
      .request(app)
      .post('/api/v1/checkToken')
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('Token chech sucessful', (done) => {
    const newAcc = {
      token : AdminToken
    };
    chai
      .request(app)
      .post('/api/v1/checkToken')
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('it should return invalid token', (done) => {
    const newAcc = {
      password:"kwizera"
    };
    chai
      .request(app)
      .patch(`/api/v1/auth/reset/${process.env.Wrong_Token}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return confirm password required', (done) => {
    const newAcc = {
      password:"kwizera"
    };
    chai
      .request(app)
      .patch(`/api/v1/auth/reset/${Usertoken}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return password strength', (done) => {
    const newAcc = {
      password:"kwizera",
      confirmPassword:"kwizera"
    };
    chai
      .request(app)
      .patch(`/api/v1/auth/reset/${Usertoken}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return not matching', (done) => {
    const newAcc = {
      password:"aPassword123!",
      confirmPassword:"aPassword123"
    };
    chai
      .request(app)
      .patch(`/api/v1/auth/reset/${Usertoken}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return reset succesful', (done) => {
    const newAcc = {
      password:"aPassword123!",
      confirmPassword:"aPassword123!"
    };
    chai
      .request(app)
      .patch(`/api/v1/auth/reset/${Usertoken}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  })

