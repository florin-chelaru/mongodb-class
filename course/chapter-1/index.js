/**
 * Created by: Florin Chelaru
 * Date: 6/3/2016
 * Time: 8:54 AM
 */

var _ = require('underscore');
_.each([1,2,3], function(v) {
  console.log(v);
});


var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(uri, function(error, db) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  var doc = {
    title: 'Susanna the Poopy Butt',
    year: 1991,
    director: 'Florin the Great',
    rating: 'PG',
    ratings: {
      critics: 80,
      audience: 97
    }
  };

  db.collection('movies').insert(doc, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    db.collection('movies').find({year: {'$gte': 1980}, 'ratings.audience': {'$gte': 90}}).toArray(function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      console.log('Found docs:');
      docs.forEach(function(doc) {
        console.log(JSON.stringify(doc));
      });
      process.exit(0);
    });
  });

  /*db.collection('sample').insert({ x: 1 }, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    db.collection('sample').find().toArray(function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      console.log('Found docs:');
      docs.forEach(function(doc) {
        console.log(JSON.stringify(doc));
      });
      process.exit(0);
    });
  });*/
});
