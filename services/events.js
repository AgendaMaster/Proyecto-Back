const MongoLib = require('../lib/mongo')
const { ObjectID } = require('mongodb')

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

  async getSuggestions() {
    const query =  { relevance: 0 }
    const suggestions = await this.mongoDB.getLimit(this.collection, 5, query)
    return suggestions
  }

  async getEventsByUser({ userId }) {
    const query = { 'users._id': ObjectID(userId) }
    const events = await this.mongoDB.getAll(this.collection, query)
    return events
  }
}

module.exports = EventsService
