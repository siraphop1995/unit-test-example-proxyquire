const _ = require("lodash");
const Bluebird = require("bluebird");
const chai = require("chai");
const expect = chai.expect;
const proxyquire = require("proxyquire");
const sinon = require("sinon");

const postQueriesStub = {
  getPostByCriteria: _.constant({}),
  "@noCallThru": true
};

const postHelpers = proxyquire("../../helpers/post.js", {
  "../queries/post": postQueriesStub,
  "@noCallThru": true
});

describe("getPostDetails", () => {
  afterEach("restore stub", () => {
    postQueriesStub.getPostByCriteria.restore();
  });

  context("when post not found", () => {
    let result;

    beforeEach("stub query methods", () => {
      sinon
        .stub(postQueriesStub, "getPostByCriteria")
        .returns(Bluebird.resolve(null));
    });

    beforeEach("call the function", async () => {
      return postHelpers
        .getPostDetails()
        .then(_result => {
          result = _result;
        })
    });

    it("should return null", () => {
      expect(result).to.be.equals(null);
    });
  });

  context("when post found", () => {
    let result;

    before("stub query methods", () => {
      sinon.stub(postQueriesStub, "getPostByCriteria").returns(
        Bluebird.resolve({
          title: "Title",
          content: "Example"
        })
      );
    });

    before("call the function", () => {
      return postHelpers.getPostDetails().then(_result => {
        result = _result;
      });
    });

    it("should return post whose title appended with site name", () => {
      expect(result.title).to.equals("Title - Woolha");
    });
  });
});

describe("getPostDetailsAsPromise", () => {
  afterEach("restore stub", () => {
    postQueriesStub.getPostByCriteria.restore();
  });

  context("when post not found", () => {
    let result;

    beforeEach("stub query methods", () => {
      sinon
        .stub(postQueriesStub, "getPostByCriteria")
        .returns(Bluebird.resolve(null));
    });

    beforeEach("call the function", async () => {
      return postHelpers
        .getPostDetailsAsPromise()
        .catch(err => {
          result = err;
        });
    });

    it("should return null", () => {
      expect(result).to.be.equals(null);
    });
  });

  context("when post found", () => {
    let result;

    before("stub query methods", () => {
      sinon.stub(postQueriesStub, "getPostByCriteria").returns(
        Bluebird.resolve({
          title: "Title",
          content: "Example"
        })
      );
    });

    before("call the function", () => {
      return postHelpers.getPostDetailsAsPromise().then(_result => {
        result = _result;
      });
    });

    it("should return post whose title appended with site name", () => {
      expect(result.title).to.equals("Title - Woolha");
    });
  });
});
