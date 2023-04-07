const { gql } = require("apollo-server");

const typeDefs = gql`
	type User {
		username: String
		email: String
		password: String
	}

	type Response {
		status: Int
		success: Boolean!
		message: String
		token: String
		id: ID
		username: String
	}

	input RegisterInput {
		username: String
		email: String
		password: String
	}
	input LoginInput {
		email: String
		password: String
	}
	type Employee {
		_id: ID!
		first_name: String
		last_name: String
		email: String
		gender: String
		salary: Float
	}
	input EmployeeInput {
		first_name: String
		last_name: String
		email: String
		gender: String
		salary: Float
	}

	type Query {
		loginUser(loginInput: LoginInput): Response
		employee(id: ID!): Employee!
		employees: [Employee]
	}

	type Mutation {
		register(registerInput: RegisterInput): Response
		editEmployee(id: ID!, employeeInput: EmployeeInput): Response
		deleteEmployee(id: ID!): Response
		createEmployee(employeeInput: EmployeeInput): Response
	}
`;

module.exports = typeDefs;
