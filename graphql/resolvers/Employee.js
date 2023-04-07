const Employee = require("../../models/Employee");

module.exports = {
	Mutation: {
		async createEmployee(_, { employeeInput }) {
			const { first_name, last_name, email, gender, salary } = employeeInput;
		  
			let ifEmailExists = await Employee.findOne({ email }).count();
		  
			if (ifEmailExists == 0) {
			  const employee = new Employee();
			  employee.first_name = first_name;
			  employee.last_name = last_name;
			  employee.email = email;
			  employee.gender = gender;
			  employee.salary = salary;
		  
			  try {
				const doc = await employee.save();
				return {
					message: `Employee Added: ${first_name} ${last_name}, Email: ${email}`,
					success: true,
				};
			  } catch (err) {
				return {
				  success: false,
				  message: `Error during insertion: ${err}`,
				};
			  }
			} else {
			  return { message: 'Email already in use.', status: 406, success: false };
			}
		  },		  
		async editEmployee(_, { id, employeeInput }) {
			console.log("id: ", id, "employeeInput: ", employeeInput) ;
			try {
			  const wasEdited = await Employee.findOneAndUpdate(
				{ _id: id },
				{ $set: employeeInput },
				{ new: true }
			  ).exec();
		  
			  if (wasEdited) {
				return { message: "Employee edited successfully.", status: 200, success: true };
			  } else {
				return { message: "Employee not found.", status: 404, success: false };
			  }
			} catch (err) {
			  console.error(err);
			  return { message: "An error occurred while editing the employee.", status: 500, success: false };
			}
		  },
		async deleteEmployee(_, { id }) {
			try	{
				const wasDeleted = await Employee.findByIdAndDelete(id).exec();
				if (wasDeleted) {
					return { message: "Employee deleted successfully.", status: 200, success: true };
				} else {
					return { message: "Employee not found.", status: 404, success: false };
				}
			} catch (err) {
				console.error(err);
				return { message: "An error occurred while deleting the employee.", status: 500, success: false };

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
