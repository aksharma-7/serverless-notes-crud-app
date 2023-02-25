const generatePolicy = (prinipalId, effect, resource) => {
  const authResponse = {};
  authResponse.prinipalId = prinipalId;
  if (effect && resource) {
    const policyDocument = {
      version: "2023-02-25",
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
  const token = event.authorizationToken;
  switch (token) {
    case "allow":
      return generatePolicy("user", "allow", event.methodArn);
    case "deny":
      return generatePolicy("user", "deny", event.methodArn);
    default:
      return "Error: Invalid Token";
  }
};

module.exports = { handler };
