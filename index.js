const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const MONGODB =
	"mongodb+srv://dbuser:test123@comp3133-assigment1.dlqhh2f.mongodb.net/?retryWrites=true&w=majority";

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

mongoose
	.connect(MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log("Server running at " + res.url);
	});

//app.use('/api/user', userController);
//app.use('/api/employees', employeeController);
