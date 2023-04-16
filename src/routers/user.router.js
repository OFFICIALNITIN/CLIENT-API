const express = require("express")
const router = express.Router();

const { insertUser, getUserByEmail } = require("../model/user/User.model")
const { hashPassword, comparePassword } = require("../helper/bcrypt.helper");
const { createAccessJWT, createRefreshJWT } = require("../helper/jwt.helper");

router.all("/", (req, res, next) => {
    // res.json({ message: "return from user router" });

    next();
});

//Create new user route
router.post('/', async (req, res) => {
    const { name, branch, rollno, year, address, phoneno, email, password } = req.body

    try {
        //hash password
        const hashedPass = await hashPassword(password)

        const newUserObj = {
            name, branch, rollno, year, address, phoneno, email,
            password: hashedPass
        }

        const result = await insertUser(newUserObj)
        console.log(result)

        res.json({ message: "New user created", result });

    } catch (error) {
        console.log(error)
        res.json({ statux: 'error', message: error.message });
    }

});

//User Sign in Router
router.post("/login", async (req, res) => {

    console.log(req.body)

    const { email, password } = req.body;


    ///hash our email and compare with db one

    if (!email || !password) {
        return res.json({ status: "error", message: "Invalid form submission!" })
    }


    ///get user with email from db
    const user = await getUserByEmail(email);

    const passFromDb = user && user._id ? user.password : null;

    if (!passFromDb) return res.json({ status: "error", message: "Invalid email or password!" })

    const result = await comparePassword(password, passFromDb)

    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password!" })

    }

    const accessJWT = await createAccessJWT(user.email)

    const refreshJWT = await createRefreshJWT(user.email)

    res.json({ status: "success", message: "Login Successfully!", accessJWT, refreshJWT })
})


module.exports = router