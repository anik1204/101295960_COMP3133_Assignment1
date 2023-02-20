const userResolvers = require("./User");
const employeeResolvers = require("./Employee");

module.exports = {
	Query: {
		...userResolvers.Query,
		...employeeResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...employeeResolvers.Mutation,
	},
};
