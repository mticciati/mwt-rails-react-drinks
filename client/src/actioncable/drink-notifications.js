const DrinkNotifications = {
  subscribe(received) {
    this.unsubscribe();
    window.App.DrinkNotificationsSubscription = window.App.cable.subscriptions.create({
      channel: "DrinkChannel",
    }, {
      received: received
    });
  },

  unsubscribe() {
    if (window.DrinkNotificationsSubscription === undefined) {
      return false;
    }

    window.App.cable.subscriptions.remove(window.App.DrinkNotificationsSubscription);
    delete window.App.DrinkNotificationsSubscription
  }
}

export default DrinkNotifications