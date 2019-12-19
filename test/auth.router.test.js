/*
const request = require('supertest');
const app = require('../app');
const session = require('supertest-session');
const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

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

describe('post /post/create',()=>{
    
    describe('성공시',()=>{

        beforeEach(()=>{
         
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
  
              .post('/post/delete')
              .send({id:11})
              .end((err,res)=>{
                  
                  console.log(res.body);
                  done();
              });
            
        });
        
    });
});


describe('post /post/readAll',()=>{
    
    describe('성공시',()=>{

        beforeEach(()=>{
         
            
        });
        it('response=>json token',(done)=>{
            request(app)

            .get('/post/readAll')
            .end((err,res)=>{
                
                console.log(res.body);
                done();
            });
        });
        afterEach(()=>{
          
        });
        
    });
});


describe('post /post/readOne',()=>{
    
    describe('성공시',()=>{

        beforeEach(()=>{
     
            
        });
        it('response=>json token',(done)=>{
            request(app)
            .get('/post/readOne?articleId=-1')
            .end((err,res)=>{
                console.log(res.body);
                done();
            });
        });
        afterEach(()=>{
          
        });
        
    });
});

describe.only('get /member/MmeberOne',()=>{
    
    describe('성공시',()=>{

        beforeEach(()=>{
    
           
           jwt.verify.mockClear();
           jwt.verify.mockReturnValue({id:2});
            
        });
        it('response=>json token',(done)=>{
            request(app)
            .get('/member/readOne')
            .end((err,res)=>{
                console.log(res.body);
                done();
            });
        });
        afterEach(()=>{
          
        });
        
    });
});
*/


describe('updateMemberOne',()=>{
    
    it('member test',()=>{
        console.log('router test');
        expect(1).toBe(1);
    
    });
});