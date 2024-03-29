import React from 'react'
import {Auth0Provider} from '@auth0/auth0-react'

const Auth0ProviderWithNavigate = ({children}) => {
      const onRedirectCallback = (appState,  user) => {
            console.log("User", user)
      }
      const domain = import.meta.env.VITE_AUTH0_DOMAIN
      const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
      const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL

      if(!domain || !clientId || !redirectUri) {throw new Error("Unable to initlaise AUTH")}

      const auth0config = {
        domain: domain,
        clientId: clientId,
        authorizationParams: {
          redirect_uri: redirectUri,
        }
      };
    
      return <Auth0Provider {...auth0config}>{children}</Auth0Provider>;
}

export default Auth0ProviderWithNavigate
