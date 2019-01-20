/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { expect } from 'chai';
import supertest from 'supertest';
import should from 'should';
import app from '../src';

// const temp = {};
const request = supertest.agent(app.listen());

describe('GET /Timestamp', () => {
  it('should get timestamp', done => {
    request
      .get('/Timestamp')
      .set('Accept', 'application/json')
      .expect(200, () => {
        done();
      });
  });
});

// success transaction record
describe('POST /Transaction', () => {
  it('should add transaction record', done => {
    request
      .post('/Transaction')
      .set('Accept', 'application/json')
      .send({
        "TransactionId":201,
        "UserId":3,
        "CurrencyAmount":4,
        "Verifier":"c91b3f22fa52721f73c8b9ea6d37d944ec44de50"
      })
      .expect(200, (err, res) => {
        should(res.body.Success).equal(true);
        done();
      });
  });
});

// fail transaction record with invlaid verifier
describe('POST /Transaction', () => {
  it('should add transaction record', done => {
    request
      .post('/Transaction')
      .set('Accept', 'application/json')
      .send({
        "TransactionId":200,
        "UserId":3,
        "CurrencyAmount":4,
        "Verifier":"c91b3f22fa52721f73c8b9ea6d37d944ec44de50"
      })
      .expect(400, (err, res) => {
        should(res.body.ErrorMessage).equal('invalid Verifier')
        done();
      });
  });
});

// success transaction data query
describe('POST /TransactionStats', () => {
  it('should get transaction record', done => {
    request
      .post('/TransactionStats')
      .set('Accept', 'application/json')
      .send({
        "UserId":3
      })
      .expect(200, (err, res) => {
        should(res.body.TransactionCount).equal(1);
        done();
      });
  });
});

// fail transaction data query
describe('POST /TransactionStats', () => {
  it('should get transaction record', done => {
    request
      .post('/TransactionStats')
      .set('Accept', 'application/json')
      .send({
        "UserId":4
      })
      .expect(400, (err, res) => {
        should(res.body.ErrorMessage).equal('Not exists UserId');
        done();
      });
  });
});

// success leaderboard score post
describe('POST /ScorePost', () => {
  it('should add score and get a score post', done => {
    request
      .post('/ScorePost')
      .set('Accept', 'application/json')
      .send({
        "UserId":3,
        "LeaderboardId": 1,
        "Score": 40
      })
      .expect(200, (err, res) => {
        should(res.body.Score).equal(40);
        should(res.body.Rank).equal(1);
        done();
      });
  });
});

// success leaderboard score post
describe('POST /ScorePost', () => {
  it('should add score and get a score post', done => {
    request
      .post('/ScorePost')
      .set('Accept', 'application/json')
      .send({
        "UserId":5,
        "LeaderboardId": 1,
        "Score": 100
      })
      .expect(200, (err, res) => {
        should(res.body.Score).equal(100);
        should(res.body.Rank).equal(1); // check changed rank
        done();
      });
  });
});

// success user save
describe('POST /UserSave', () => {
  it('should add user', done => {
    request
      .post('/UserSave')
      .set('Accept', 'application/json')
      .send({
        "UserId": 1,
        "Data": {
            "Piece1": {
                "SubData": 1234,
                "SubData2": "abcd"
            },
            "Piece2": {
                "SubData": {
                    "SubSubData": 5678
                }
            }
        }
    })
      .expect(200, (err, res) => {
        should(res.body.Success).equal(true);
        done();
      });
  });
});


// success user save
describe('POST /UserSave', () => {
  it('should add user', done => {
    request
      .post('/UserSave')
      .set('Accept', 'application/json')
      .send({
        "UserId": 1,
        "Data": {
            "Piece1": {
                "SubData": 1234,
                "SubData2": "abcd"
            },
            "Piece2": {
                "SubData": {
                    "SubSubData": 5678
                }
            }
        }
    })
      .expect(200, (err, res) => {
        should(res.body.Success).equal(true);
        done();
      });
  });
});

// success user save
describe('POST /UserSave', () => {
  it('should update user', done => {
    request
      .post('/UserSave')
      .set('Accept', 'application/json')
      .send({
        "UserId": 1,
        "Data": {
            "Piece2": {
                "SubData": {
                    "SubSubData": 9999
                }
            }
        }
    })
      .expect(200, (err, res) => {
        should(res.body.Success).equal(true);
        done();
      });
  });
});

// success user load
describe('POST /UserLoad', () => {
  it('should get UserLoad', done => {
    request
      .post('/UserLoad')
      .set('Accept', 'application/json')
      .send({
        "UserId":1
      })
      .expect(200, (err, res) => {
        should(res.body.Piece2.SubData.SubSubData).equal(9999);
        done();
      });
  });
});
