const User = require('../models/user');
const Post = require('../models/post');

describe('userFindOne',()=>{
    describe('성공시',()=>{
        
        it('user object=>',async ()=>{
            const user = await User.findUserOne({email:'admin',password:'admin'});
            console.log(user);
        })

    });
});

describe('createPostOne',()=>{
    describe('성공시',()=>{
        beforeEach(()=>{
            
        })
        it('post object=>',async ()=>{
            const user = await Post.createPostOne({title:'admin',content:'admin',img:'',user:11});
            console.log(user);
        })

        afterEach(async ()=>{
            const result = await Post.deletePostOne(11);
            console.log(result);
        })



    });
});

describe.only('selectPostAll',()=>{
    it('post object=>',async ()=>{
        const result = await Post.selectPostAll();
        console.log(result);
    })
});
