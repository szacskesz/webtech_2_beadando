const assert = require("assert");
const RequestService = require("../RequestService");
var requestService = new RequestService();

describe("RequestService tests", function() {
    it("Test getAllRequests", function(done) {
        setTimeout(()=> {
            requestService.getAllRequests((data) => {
                console.log(data);
                done();
            })
        }, 3000)

    })
})