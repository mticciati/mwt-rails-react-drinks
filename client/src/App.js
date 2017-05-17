import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { CreateConsumer } from './actioncable/create-consumer';
// import DrinkNotifications from './actioncable/drink-notifications'

// /**** Action cable logic ***/
window.App = {};
// CreateConsumer()
// DrinkNotifications.subscribe((data) => {
//   console.log(data);
// });

class App extends Component {
  constructor() {
    super()
    this.state = {}
    this.getDrinks = this.getDrinks.bind(this)
    this.getDrink = this.getDrink.bind(this)
  }

  componentDidMount() {
    this.getDrinks()
    CreateConsumer()
    // DrinkNotifications.subscribe((data) => {
    //   console.log(data);
    // });
    this.setupSubscription();
  }
  setupSubscription() {
    window.App.drinks = window.App.cable.subscriptions.create("DrinksChannel", {
      // console.log(this.state),
      connected: function() {
        console.log('Connected!')
        // this.perform('follow_drink', {drink_id: 3})
      },

      received: function(data) {
        console.log('received!')
        this.getDrink(data.drink)
      },

      getDrink: this.getDrink.bind(this)
    });

    
  }
  fetch (endpoint) {
    return new Promise((resolve, reject) => {
      window.fetch(endpoint)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    })
  }
  getDrinks() {
    this.fetch('api/drinks')
      .then(drinks => {
        this.setState({ drinks: drinks })
        this.getDrink(drinks[0].id)
      })
  }
  getDrink(id) {
    this.fetch(`api/drinks/${id}`)
      .then(drink => this.setState({ drink: drink }))
  }
  render() {
    let {drinks, drink} = this.state
    return drinks
    ? <Container text>
      <Header as='h2' icon textAlign='center'>
        <Icon name='cocktail' circular />
        <Header.Content>
          List of Ingredients
        </Header.Content>
      </Header>
      <Button.Group fluid widths={drinks.length}>
        {Object.keys(drinks).map((key) => {
          return <Button active={drink && drink.id === drinks[key].id} fluid key={key} onClick={() => this.getDrink(drinks[key].id)}>
            {drinks[key].title}
          </Button>
        })}
      </Button.Group>
      <Divider hidden />
      {drink &&
        <Container>
          <Header as='h2'>{drink.title}</Header>
          {drink.description && <p>{drink.description}</p>}
          {drink.ingredients &&
            <Segment.Group>
              {drink.ingredients.map((ingredient, i) => <Segment key={i}>{ingredient.description}</Segment>)}
            </Segment.Group>
          }
          {drink.steps && <p>{drink.steps}</p>}
        </Container>
      }
    </Container>
    : <Container text>
      <Dimmer active inverted>
        <Loader content='Loading' />
      </Dimmer>
    </Container>
  }
}

export default App;
