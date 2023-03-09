const { CognitoJwtVerifier } = require("aws-jwt-verify");

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-1_pq9J83KpY",
  tokenUse: "id",
  clientId: "3vakgaqu0blbibv97p9tqrtoqu",
});

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect, // Allow or Deny
          Resource: resource, // ARN of API Gateway
          Action: "execute-api:Invoke",
        },
      ],
    };
    authResponse.policyDocument = policyDocument;
  }
  authResponse.context = {
    foo: "bar",
  };
  console.log(JSON.stringify(authResponse));
  return authResponse;
};

const handler = async (event) => {
  try {
    const token = event.authorizationToken;
    console.log(token);
    const payload = await jwtVerifier.verify(token);
    console.log(JSON.stringify(payload));
    return generatePolicy("user", "Allow", event.methodArn);
  } catch (error) {
    return "Error: Invalid Token";
  }
};

module.exports = { handler };
