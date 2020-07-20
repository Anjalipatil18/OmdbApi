const ImdbDataModel = require('../model/imdbDataDb');
const FetchMovie = require('../controller/omdbMovieLogic');

//Add Route
exports.getOne = {
    handler: async function (request, reply) {
        let imdbId = request.params.imdbID;
        try{
          const movieDetails = await ImdbDataModel.findOne({imdbID: imdbId});
          if(movieDetails){
            return movieDetails;
          }
          else{
            let movieData =  await FetchMovie.omdbMovie(imdbId)
            let ImdbData = new ImdbDataModel(movieData);
            let result = await ImdbData.save();
            return reply.response(result);
          }
        }catch(error) {
          return reply.response(error).code(500);
        } 
    }
};

exports.getAll={
  handler : async (request, reply) => {
    const pageOptions={
      page:parseInt(request.query.page, 10) || 0,
      limit:parseInt(request.query.limit,10) || 10
    }
      try{
         let ImdbData = await ImdbDataModel.find({},{"_id":0, "Title":1, "Year":1, "genre":1, "imdbID":1})
         .limit(pageOptions.limit).skip(pageOptions.page*pageOptions.limit);
          return reply.response(ImdbData);
      } catch(error) {
          return reply.response(error).code(500);
      }
  }
};

exports.getByType = {
  handler: async function (request, reply) {
    let imdbId = request.params.id;
    try {
        let omdbMovieTypeData = await FetchMovie.typeData(imdbId);
        return reply.response(omdbMovieTypeData;
    } catch (error){
      return reply.response(error).code(500);
    }
  }
};