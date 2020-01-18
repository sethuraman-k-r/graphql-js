const { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Salary {
        salary: Int!
        from: String
        to: String
    }

    type EmployeeSalary {
        empNo: Int!
        totalLength: Int
        salaryDetails: [Salary]
    }

    type Employee {
        empNo: Int
        birthDate: String
        fullName: String
        sex(format: String): String
    }

    type Department {
        deptNo: String
        deptName: String
    }

    type Query {
        employees(limit: Int): [Employee]
        departments: [Department],
        getSalary(empId: Int!): EmployeeSalary
    }
`);

module.exports = schema;