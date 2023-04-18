const { UserSchema } = require("./User.schema")

const insertUser = userObj => {
    return new Promise((reslove, reject) => {
        UserSchema(userObj)
            .save()
            .then(data => reslove(data))
            .catch(error => reject(error))
    });

};

const getUserByEmail = email => {

    return new Promise((resolve, reject) => {
        if (!email) return false;

        try {

            UserSchema.findOne({ email })
                .then(data => resolve(data))
                .catch(error => reject(error))

        } catch (error) {
            reject(error);
        }
    })
}

const storeUserRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate({ _id }, {
                $set: {
                    "refreshJWT.token": token,
                    "refreshJWT.addedAt": Date.now()
                }
            },
                { new: true }
            ).then(data => resolve(data))
                .catch((error) => {
                    console.log(error)
                    reject(error)

                })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

module.exports = {
    insertUser,
    getUserByEmail,
    storeUserRefreshJWT
}