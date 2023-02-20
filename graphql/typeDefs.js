const { gql } = require("apollo-server");

const typeDefs = gql`
	type User {
		username: String
		email: String
		password: String
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
		loginUser(loginInput: LoginInput): User
		employee(id: ID!): Employee!
		employees: [Employee]
	}

	type Mutation {
		register(registerInput: RegisterInput): User
		updateEmployee(id: ID!, employeeInput: EmployeeInput): Employee
		deleteEmployee(id: ID!): Employee
		createEmployee(employeeInput: EmployeeInput): Employee
	}
`;

module.exports = typeDefs;
