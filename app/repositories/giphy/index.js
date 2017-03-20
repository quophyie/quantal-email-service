const BaseRepository = require('quantal-nodejs-bookshelf-base-repository')
const GiphyModel = require('../../models/giphy')

class GiphyRepository extends BaseRepository {
  /**
   * Repositories must call BaseRepository constructor
   */
  constructor () {
    super(GiphyModel)
  }
}

module.exports = GiphyRepository
