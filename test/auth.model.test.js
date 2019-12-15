/*
const User = require('../models/user');
const Post = require('../models/post');
const Member = require('../models/member');

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

describe('selectPostAll',()=>{
    it('post object=>',async ()=>{
        const result = await Post.selectPostAll();
        console.log(result);
    })
});

describe('selectPostOne',()=>{
    it('post object=>',async ()=>{
        const result = await Post.selectPostOne({articleId:1});
        console.log(result);
    })
});

describe('selectMemberOne',()=>{
    it('member object=>',async ()=>{
        const result = await Member.selectMemberOne({id:2});
        console.log(result);
    })
});
*/

describe('updateMemberOne',()=>{
    
    it('member test',()=>{
        console.log('update member mock');
    
    });
});


