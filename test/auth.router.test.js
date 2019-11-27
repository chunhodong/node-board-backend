const request = require('supertest');
const app = require('../app');
const session = require('supertest-session');
const jwt = require('jsonwebtoken');

let testSession;

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
        
    });
});
//jest.mock('../routes/middlewares');

describe.only('post /post/create',()=>{
    
    describe('성공시',()=>{

        beforeEach(()=>{
            /*
            testSession = session(app,{
                before:(req)=>{
                    req.set('token',{token_id:25});
                },
            });
            */
            jest.mock('jsonwebtoken');
            jwt.verify.mockClear();
            jwt.verify.mockReturnValue({id:11});
        });
        it('response=>json token',(done)=>{
            request(app)
          //  testSession

            .post('/post/create')
            .send({article_title:'admin',article_content:'admin',article_img:''})
            .end((err,res)=>{
                
                console.log(res.body);
                done();
            });
        });
        afterEach(()=>{
            console.log('after each');
            request(app)
            //  testSession
  
              .post('/post/delete')
              .send({id:11})
              .end((err,res)=>{
                  
                  console.log(res.body);
                  done();
              });
            
        });
        
    });
});