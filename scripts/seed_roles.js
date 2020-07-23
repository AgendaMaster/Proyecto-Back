const chalk = require("chalk");
const MongoLib = require("../lib/mongo");

async function checkRoles(mongo) {
  const roles = await mongo.getAll("roles", {
    or: [{name: "admin"}, {name: "admin_company"}, {name: "user"}]
  });
  return roles && roles.length;
}

async function createRoles() {
  try {
    const mongo = new MongoLib();

    if (await checkRoles(mongo)) {
      console.log(chalk.yellow("Roles already exists"));
      return process.exit(1);
    }

    await mongo.create("roles", {name: 'admin', description: 'administrador'})
    await mongo.create("roles", {name: 'admin_company', description: 'administrador compañia'})
    await mongo.create("roles", {name: 'user', description: 'usuarios'})
    console.log(chalk.green("Roles created"));
    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

createRoles();