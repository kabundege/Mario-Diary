import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import localStorage from 'localStorage';

const { expect } = chai;

chai.use(chaiHttp);

describe('Story Tests', () => {
  let Usertoken ;
  let AdminToken;
  let storyID;
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
  it('all Users Not allowed', (done) => {
    localStorage.setItem("token",Usertoken)
    chai
      .request(app)
      .get('/api/v1/users')
      
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('All users success', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('validation error', (done) => {
    localStorage.setItem("token",AdminToken)
    const user = {
      title:"going to school",
      content: `${process.env.Old_token}`
    }
    chai
      .request(app)
      .post('/api/v1/stories')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('NO Stories Found', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get('/api/v1/stories')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('should return Content NotFound',(done)=>{
    const search = {
        searchType:"story",
        content:'  '
    }
    chai
        .request(app)
        .post('/api/v1/search')
        .send(search)
        .end((err,res)=>{
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('No Stories Yet');
            done();
        });
  });
  it('No Specific story Failure', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get(`/api/v1/story/098098`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Public story failure', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get(`/api/v1/public/stories`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Story With Untitled Document', (done) => {
      localStorage.setItem("token",AdminToken)
      const user = {
        title:"Untitled Document",
        content: `${process.env.Old_token}`,
        status : 'public'
      };
      chai
        .request(app)
        .post('/api/v1/stories')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
  });
  it('contact us failure', (done) => {
    localStorage.setItem("token",AdminToken)
    const user = {
      title:"going to school",
      content: `${process.env.Old_token}`,
      status : 'public'
    };
    chai
      .request(app)
      .post('/api/v1/contactUs')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('contact us sucess', (done) => {
    localStorage.setItem("token",AdminToken)
    const user = {
      subject:"going to school",
      content: `${process.env.Old_token}`,
      authorEmail : 'kabundege2@outlook.com'
    };
    chai
      .request(app)
      .post('/api/v1/contactUs')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Story created sucessfully', (done) => {
    localStorage.setItem("token",AdminToken)
    const user = {
      title:"going to school",
      content: `${process.env.Old_token}`,
      status : 'public'
    };
    chai
      .request(app)
      .post('/api/v1/stories')
      .send(user)
      .end((err, res) => {
        storyID = res.body.data.storyID
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('Get All stories', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get('/api/v1/stories')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Specific story success', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get(`/api/v1/story/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Specific story Failure', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get(`/api/v1/story/098098`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Public story success', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get(`/api/v1/public/stories`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Story updates sucessfully', (done) => {
    localStorage.setItem("token",AdminToken)
    const user = {
      title:"going to school",
      content: `${process.env.Old_token}`,
      status :'private'
    };
    chai
      .request(app)
      .patch(`/api/v1/story/${storyID}`)
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Story updates ID of invalid', (done) => {
    localStorage.setItem("token",AdminToken)
    const user = {
      title:"going to school",
      content: `${process.env.Old_token}`,
      status : 'private'
    };
    chai
      .request(app)
      .patch(`/api/v1/story/87746`)
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Story updated token found no stories', (done) => {
    localStorage.setItem("token",Usertoken)
    const user = {
      title:"going to school",
      content: `${process.env.Old_token}`,
      status : 'private'
    };
    chai
      .request(app)
      .patch(`/api/v1/story/${storyID}`)
      .send(user)
      
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Story delete Id of invalid', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .delete(`/api/v1/story/987`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Story delete token found no stories', (done) => {
    localStorage.setItem("token",Usertoken)

    chai
      .request(app)
      .delete(`/api/v1/story/${storyID}`)
      
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Story likes sucessfully', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/like/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Story delete successful', (done) => {
    localStorage.setItem("token",AdminToken)

    chai
      .request(app)
      .delete(`/api/v1/story/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Story likes failure', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/like/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Page Not Found', (done) => {
    localStorage.setItem("token",Usertoken)

    chai
      .request(app)
      .get(`/v1/story/${storyID}`)
      
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('No token', (done) => {
    localStorage.removeItem("token")
    chai
      .request(app)
      .delete(`/api/v1/story/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('old token', (done) => {
    localStorage.setItem("token",process.env.Old_token)
    chai
      .request(app)
      .delete(`/api/v1/story/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('wrong token', (done) => {
    localStorage.setItem("token",process.env.Wrong_Token)

    chai
      .request(app)
      .delete(`/api/v1/story/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('Invalid Page', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
})