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
					//console.log(err);
					if (!err) {
						return {
							success: true,
							message: 'Signup successful',
							status: 200,
						};
					} else return  { success: false, message: "Error during insertion: " + err };
				});
			} else {
				return { success: false, message: "Username/Email already in use." };
			}
		},
	},
	Query: {
		async loginUser(_, { loginInput: { email, password } }) {
			let user = await Users.findOne({ email });
			if (!user) {
			  return {
				success: false,
				message: 'User not found',
				status: 404,
			  };
			}
			if (user.password != password) {
			  return {
				success: false,
				message: 'Incorrect password',
				status: 401,
			  };
			} else {
			  console.log(user);
			  return {
				success: true,
				status: 200,
				message: 'Login successful',
				id: user._id,
				email: user.email,
			  };
			}
		  },		  
	},
};
