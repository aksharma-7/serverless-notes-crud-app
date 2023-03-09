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
    switch (token) {
      case "allow":
        return generatePolicy("user", "Allow", event.methodArn);
      case "deny":
        return generatePolicy("user", "deny", event.methodArn);
      default:
        return "Error: Invalid Token";
    }
  } catch (error) {
    console.log("error occuroed", error);
  }
};

module.exports = { handler };
