const { CognitoJwtVerifier } = require("aws-jwt-verify");

const { COGNITO_USERPOOL_ID, COGNITO_WEB_CLIENT_ID } = process.env;

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: COGNITO_USERPOOL_ID,
  tokenUse: "id",
  clientId: COGNITO_WEB_CLIENT_ID,
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
