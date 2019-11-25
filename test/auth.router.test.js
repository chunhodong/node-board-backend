const request = require('supertest');
const app = require('../app');
describe('post /auth/login',()=>{
    describe('성공시',()=>{
        
        it('response=>json token',(done)=>{
            request(app)
            .post('/auth/login')
            .send({email:'admin',password:'admin'})
            .end((err,res)=>{
                
                console.log(res.body);
                done();
            });
        })

        /*
        it('response=>json token',(done)=>{
            request(app)
            .get('/v1/test')
            .end((err,res)=>{
                
                console.log(res.body);
                done();
            });
        })
        */
        
    });
});