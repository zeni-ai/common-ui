import OAuthClient from "intuit-oauth-ts";
type QuickbookUtility = {
    isInitiated: boolean;
    init: (redirectPath: string, tenantEmailDomain: string) => void;
    handleClick: () => void;
  };
  
export const quickBooksUtility = ((): QuickbookUtility => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let authUri: any;
    let oauthClient;
    let isInitiated = false;
    const init = (redirectPath: string, tenantEmailDomain: string): void => {
      oauthClient = new OAuthClient({
        clientId: 'abckey',
        clientSecret: "", 
        environment: 'sandbox',
        redirectUri: window.location.origin + redirectPath,
      });
      authUri = oauthClient.authorizeUri({
        state: tenantEmailDomain,
        scope: [
          OAuthClient.scopes.Accounting,
          OAuthClient.scopes.OpenId,
          OAuthClient.scopes.Email,
          OAuthClient.scopes.Profile,
        ],
      });
      isInitiated = true;
    };
    const handleClick = (): void => {
      window.open(authUri, "_self", "noopener");
    };
    return {
      isInitiated,
      init,
      handleClick,
    };
  })();