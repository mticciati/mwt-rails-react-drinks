export const WS_URL =  process.env.NODE_ENV === 'production' ?
                       'wss://mwt-rails-react-drinks.herokuapp.com/cable' :
                       'ws://localhost:3001/cable';