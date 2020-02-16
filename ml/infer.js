let req = require("request");

const uri = "http://13.87.230.119/api/v1/service/hr-prediction2/score";
const apiKey = "uV9vFguDxaHw6szpb1nIGgbBqRJgsa5A";

let test_sample = {'data': [
        [0.5], [0.6]
    ]};

const options = {
    uri: uri,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
    },
    body: JSON.stringify(test_sample)
};

req(options, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        console.log(body);
    } else {
        console.log("The request failed with status code: " + res.statusCode);
    }
});