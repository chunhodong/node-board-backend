const User = require('../models/user');

describe.only('userFindOne',()=>{
    describe('성공시',()=>{
        
        it('user object=>',async ()=>{
            const user = await User.findUserOne({email:'admin',password:'admin'});
            console.log(user);
        })

    });
});