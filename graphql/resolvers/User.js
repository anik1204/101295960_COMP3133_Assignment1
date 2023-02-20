const Users = require("../../models/User");
const ApolloError = require("apollo-server-errors");

async function getPass(cred, type = "username") {
	return new Promise((res, rej) => {
		let result = Users.findOne({ [type]: [cred] }, function (err, docs) {
			if (err) throw err;
			res(docs.password);
		});
	});
}

module.exports = {
	Mutation: {
		async register(_, { registerInput: { username, email, password } }) {
			let ifUsernameExists = await Users.findOne({ username }).count();
			let ifEmailExists = await Users.findOne({ email }).count();
			if (ifUsernameExists == 0 && ifEmailExists == 0) {
				const user = new Users();
				user.username = username;
				user.password = password;
				user.email = email;
				user.save((err, doc) => {
					if (!err) {
						return {
							id: doc._id,
							...doc._doc,
						};
					} else return "Error during insertion: " + err;
				});
			} else {
				return { message: "Username/Email already in use." };
			}
		},
	},
	Query: {
		async loginUser(_, { loginInput: { username, password } }) {
			let user = await Users.findOne({ username });
			if (!user) {
				return false;
			}
			if (user.password != password) {
				throw new ApolloError("Incorrect password");
			} else {
				console.log(user);

				return {
					id: user._id,
					username: user.username,
				};
			}
		},
	},
};
