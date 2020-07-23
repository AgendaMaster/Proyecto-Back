const MongoLib = require('../lib/mongo');

class RolesService {
  constructor() {
    this.collection = "roles";
    this.mongoDB = new MongoLib();
  }
  
  async getRoles({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const roles = await this.mongoDB.getAll(this.collection, query);
    return roles || [];
  }

  async getRol({ roleId }) {
    const role = await this.mongoDB.get(this.collection, roleId);
    return role || {};
  }

  async createRol({ role }) {
    const roleCreated = await this.mongoDB.create(this.collection, role);
    return roleCreated;
  }

  async updateRol({ roleId, role } = {}) {
    const roleUpdated = await this.mongoDB.update(
      this.collection,
      roleId,
      role
    );
    return roleUpdated;
  }


  async deleteRol({ roleId }) {
    const roleDeleted = await this.mongoDB.delete(this.collection, roleId);
    return roleDeleted;
  }

}

module.exports = RolesService;
