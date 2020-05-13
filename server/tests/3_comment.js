import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import localStorage from 'localStorage';

const { expect } = chai;

chai.use(chaiHttp);

describe('Comments Tests', () => {
  let Usertoken ;
  let AdminToken;
  let storyID;
  let commentID;
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

  it('should return StoryId NotFound', (done) => {
    chai
      .request(app)
      .get('/api/v1/comment/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Story NotFound')
        done();
      });
  });

  it('should return NoComments Found', (done) => {
    chai
      .request(app)
      .get(`/api/v1/comment/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('No Comments Found')
        done();
      });
  });

  it('Story created sucessfully', (done) => {
    localStorage.setItem("token",AdminToken)
    const user = {
      author:"going to school",
      content: `${process.env.Old_token}`
    };
    chai
      .request(app)
      .post(`/api/v1/comment/${storyID}`)
      .send(user)
      .end((err, res) => {
        commentID = res.body.data.commentid;
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return Comments', (done) => {
    chai
      .request(app)
      .get(`/api/v1/comment/${storyID}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return Comment Validation', (done) => {
    localStorage.setItem("token",AdminToken)
    const user = {
      content: `${process.env.Old_token}`
    };
    chai
      .request(app)
      .post(`/api/v1/comment/${storyID}`)
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Story created sucessfully', (done) => {
    localStorage.setItem("token",Usertoken)
    chai
      .request(app)
      .delete(`/api/v1/comment/${storyID}/${commentID}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('return comment deleted Succesfully', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .delete(`/api/v1/comment/${storyID}/${commentID}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('return comment NotFound', (done) => {
    localStorage.setItem("token",AdminToken)
    chai
      .request(app)
      .delete(`/api/v1/comment/${storyID}/${commentID}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
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
        expect(res.status).to.equal(201);
        done();
      });
  });

});
