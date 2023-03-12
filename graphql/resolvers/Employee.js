const Employee = require("../../models/Employee");

module.exports = {
	Mutation: {
		async createEmployee(_, { employeeInput: { first_name, last_name, email, gender, salary }}) 
		{
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
						return({
							status: 201,
							message:
								"Employee Added: " +
								first_name +
								" " +
								last_name +
								", Email: " +
								email,
								_id: doc._id,
						});
					} else return("Error during insertion: " + err);
				});
			} else {
				return ({ message: "Email already in use.", status: 406 });
			}
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
