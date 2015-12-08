import Ember from 'ember';

export default Ember.Controller.extend({
  createItem(item, userId) {
    var newItem = this.store.createRecord('item', {
      name: item.get('name'),
      price: item.get('price'),
      gunType: item.get('gunType'),
      imageUrl: item.get('imageUrl'),
      condition: item.get('condition'),
      rarity: item.get('rarity'),
      isStattrack: item.get('isStattrack'),
      isSouvenir: item.get('isSouvenir'),
      userId: userId
    });

    newItem.save();
    return newItem;
  },

  actions: {
    generateItem(item) {
      function giveItemToUser() {
        user.get('items').pushObject(newItem);
      }

      var newItem = this.createItem(item, App.currentUserId);

      var user = this.store.peekRecord('user', App.currentUserId);
      giveItemToUser();
    }
  }
});
