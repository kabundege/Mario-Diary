import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Search Tests', () => {

    it('should return searchType Invalid',(done)=>{
        chai
            .request(app)
            .post('/api/v1/search')
            .end((err,res)=>{
                expect(res.status).to.equal(400);
                expect(res.body.error).to.equal('Something is Missing');
                done();
            });
    });
    it('should return Content Validations',(done)=>{
        const search = {
            searchType:"story"
        }
        chai
            .request(app)
            .post('/api/v1/search')
            .send(search)
            .end((err,res)=>{
                expect(res.status).to.equal(400);
                expect(res.body.error).to.equal('Must Input Search Content');
                done();
            });
    });

    it('should return Content NotFound',(done)=>{
        const search = {
            content:"  ",
            searchType:"story"
        }
        chai
            .request(app)
            .post('/api/v1/search')
            .send(search)
            .end((err,res)=>{
                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('No Story With That Specifications');
                done();
            });
    });

    it('should return stories results Successfuly',(done)=>{
        const search = {
            searchType:"story",
            content:'e'
        }
        chai
            .request(app)
            .post('/api/v1/search')
            .send(search)
            .end((err,res)=>{
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('should return person NotFound',(done)=>{
        const search = {
            searchType:"people",
            content:"   "
        }
        chai
            .request(app)
            .post('/api/v1/search')
            .send(search)
            .end((err,res)=>{
                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal("No User By That Name");
                done();
            });
    });

    it('should return people results Successfuly',(done)=>{
        const search = {
            searchType:"people",
            content:'e'
        }
        chai
            .request(app)
            .post('/api/v1/search')
            .send(search)
            .end((err,res)=>{
                expect(res.status).to.equal(200);
                done();
            });
    });
    
})
