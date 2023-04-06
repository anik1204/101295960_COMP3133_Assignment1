const Employee = require("../../models/Employee");
const { ObjectId } = require('mongodb');

module.exports = {
	Mutation: {
		async createEmployee(
			_,
			{ employeeInput: { first_name, last_name, email, gender, salary } }
		) {
			let ifEmailExists = await Employee.findOne({ email }).count();
			if (ifEmailExists == 0) {
				const employee = new Employee();
				employee.first_name = first_name;
				employee.last_name = last_name;
				employee.email = email;
				employee.gender = gender;
				employee.salary = salary;
				employee.save((err, doc) => {
					if (!err) {
						return {
							status: 201,
							message:
								"Employee Added: " +
								first_name +
								" " +
								last_name +
								", Email: " +
								email,
							_id: doc._id,
						};
					} else return "Error during insertion: " + err;
				});
			} else {
				return { message: "Email already in use.", status: 406 };
			}
		},
		async editEmployee(
			_,
			{ id, employeeInput: { first_name, last_name, email, gender, salary } }
		  ) {
			const objectId = new ObjectId(id);
			console.log(objectId);
			const wasEdited = await Employee.findByIdAndUpdate(objectId, {
			  first_name: first_name,
			  last_name: last_name,
			  email: email,
			  gender: gender,
			  salary: salary,
			}).modifiedCount;
			return wasEdited > 0
			  ? { message: "Employee edited successfully.", status: 200, success: true }
			  : { message: "Employee not found.", status: 404, success: false };
		  },		  
		async deleteEmployee(_, { ID }) {
			const wasDeleted = await Employee.findByIdAndDelete(ID).deletedCount;
			return wasDeleted > 0
				? { message: "Employee deleted successfully.", status: 200 }
				: { message: "Employee not found.", status: 404 };
		},
	},
	Query: {
		async employees(_, args) {
			let employees = await Employee.find();
			return employees;
		},
		async employee(_, { id }) {
			let employee = await Employee.findById(id);
			return employee;
		},
	},
};
