const MongoLib = require('../lib/mongo')

class EventsService {
  constructor() {
    this.collection = 'events'
    this.mongoDB = new MongoLib()
  }
  
  async getEvents({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const events = await this.mongoDB.getAll(this.collection, query)
    return events || []
  }

  async getEvent({ eventId }) {
    const event = await this.mongoDB.get(this.collection, eventId)
    return event || {}
  }

  async createEvent({ event }) {
    const createEventId = await this.mongoDB.create(this.collection, event)
    return createEventId
  }

  async updateEvent({ eventId, event } = {}) {

    const updatedEventId = await this.mongoDB.update(
      this.collection,
      eventId,
      event
    );
    return updatedEventId
  }

  async deleteEvent({ eventId }) {
    const deletedEventId = await this.mongoDB.delete(this.collection, eventId)
    return deletedEventId
  }
}

module.exports = EventsService
