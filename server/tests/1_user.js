import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import localStorage from 'localStorage';

const { expect } = chai;

chai.use(chaiHttp);

describe('User Tests', () => {
  let Usertoken ;
  let AdminToken;
  let UserID;
  let UserToken2;
  it('it should return validation error', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'christophekwizera1@gmail.com',
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
      email: 'christophekwizera1@gmail.com',
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
      firstName: 'kwizera',
      lastName: 'Ishimwe',
      email: 'christophekwizera1@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        Usertoken = res.body.data.token;
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('it should return account created', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'kabundege',
      email: 'christophekwizera@yahoo.fr',
      password:'aPassword123!',
      confirmPassword:'aPassword123!'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        UserID = res.body.data.id;
        UserToken2 = res.body.data.token; 
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('it should return account already exits', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'christophekwizera1@gmail.com',
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

  it('should return verification failure', (done) => {
    const user = {
      email: 'christophekwizera1@gmail.com',
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

  it("should return verification success",(done)=>{
    chai
      .request(app)
      .get(`/api/v1/checkToken/${Usertoken}`)
      .end((req,res)=>{
        expect(res.status).to.equal(200)
        done();
      })
  })

  it("should return verification success",(done)=>{
    chai
      .request(app)
      .get(`/api/v1/checkToken/${UserToken2}`)
      .end((req,res)=>{
        expect(res.status).to.equal(200)
        done();
      })
  })

  it('should return admin Login successfuly', (done) => {
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

  it('should return user Login successfuly', (done) => {
    const user = {
      email: 'christophekwizera1@gmail.com',
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
      email: 'christophekwizera1@gmail.com',
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
    chai
      .request(app)
      .get(`/api/v1/checkToken/${process.env.Old_token}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
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

  it('it should return Restriction', (done) => {
    localStorage.setItem("token",Usertoken)
    const newAcc = {
      status:"active"
    };
    chai
      .request(app)
      .patch(`/api/v1/user/${Usertoken}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });

  it('it should return Validation Error', (done) => {
    localStorage.setItem("token",AdminToken)
    const newAcc = {
      status:"activation"
    };
    chai
      .request(app)
      .patch(`/api/v1/user/${Usertoken}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return User NotFound', (done) => {
    localStorage.setItem("token",AdminToken)
    const newAcc = {
      status:"active"
    };
    chai
      .request(app)
      .patch(`/api/v1/user/97306e9b-0ed8-493e-a900-39027439ae43`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('should return user profile', (done) => {
    localStorage.setItem("token",Usertoken)
    chai
      .request(app)
      .get('/api/v1/profile')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should return Account status Changed to dormant', (done) => {
    localStorage.setItem("token",AdminToken)
    const newAcc = {
      status:"dormant"
    };
    chai
      .request(app)
      .patch(`/api/v1/user/${UserID}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('should return Consult the admin', (done) => {
    const user = {
      email: 'christophekwizera@yahoo.fr',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('it should return Account status Changed to active', (done) => {
    localStorage.setItem("token",AdminToken)
    const newAcc = {
      status:"active"
    };
    chai
      .request(app)
      .patch(`/api/v1/user/${UserID}`)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  
})
