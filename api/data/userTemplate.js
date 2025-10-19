const users = [
  {
    name: "Burak Canbaz",
    email: "burak@gmail.com",
    password: "123",
    type: "Admin",
    role: "Owner",
    division: ["All Divisions"],
  },
  {
    name: "Jane",
    email: "jane@gmail.com",
    password: "123",
    type: "Admin",
    role: "Editor",
    division: ["Engineering", "Recruitment", "Marketing"],
  },
  {
    name: "John Verdon",
    email: "verdon@gmail.com",
    password: "123",
    type: "Admin",
    role: "Viewer",
    division: ["Engineering", "Customer Support", "Data Science"],
  },
  {
    name: "Adam Fawer",
    email: "adam@gmail.com",
    password: "123",
    type: "Admin",
    role: "Viewer",
    division: ["Customer Support", "Engineering"],
  },
  {
    name: "Michael Jordan",
    email: "jordan23@gmail.com",
    password: "123",
    type: "Admin",
    role: "Editor",
    division: ["Engineering", "Customer Support"],
  },
  {
    name: "Larry Bird",
    email: "bird@gmail.com",
    password: "123",
    type: "Admin",
    role: "Editor",
    division: ["Engineering", "Customer Support", "Data Science"],
  },
];

module.exports = { users };