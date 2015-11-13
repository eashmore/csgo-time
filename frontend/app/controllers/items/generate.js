import Ember from 'ember';

export default Ember.Controller.extend({
  items: Ember.computed(function(){
    let items = [];

    let i1 = {name: "Frontside Misty", price: 5.0, gunType:"AK-47", imageUrl: "1",
    condition:"Field-Tested", rarity: "Classified", isStattrack: true};
    items.push(i1);

    let i2 = {name: "Mudder", price: 1.23, gunType:"Desert Eagle", imageUrl: "2",
    condition:"Well-Worm", rarity: "Industrial Grade"};
    items.push(i2);

    let i3 = {name: "Forest DDPAT", price: 0.77, gunType:"MP7", imageUrl: "3",
    condition:"Battle-Scarred", rarity: "Consumer Grade"};
    items.push(i3);

    let i4 = {name: "Howl", price: 500.0, gunType:"M4A4", imageUrl: "4",
    condition:"Factory New", rarity: "Contraband", isStattrack: true};
    items.push(i4);

    let i5 = {name: "Origami", price: 4.0, gunType:"Sawed-Off", imageUrl: "5",
    condition:"Minimal Wear", rarity: "Mil-Spec"};
    items.push(i5);

    let i6 = {name: "Blue Steel", price: 9.51, gunType:"Bayonet", imageUrl: "6",
    condition:"Field-Tested", rarity: "Covert", isSouvenir: true};
    items.push(i6);

    return items;
  }),

  actions: {
    generateItem(item) {
      let currentUser = this.store.findRecord('user', window.CURRENT_USER);
      let newItem = this.store.createRecord('item', {
        name: item.name,
        price: item.price,
        gunType: item.gunType,
        imageUrl: item.imageUrl,
        condition: item.condition,
        rarity: item.rarity,
        isStattrack: item.isStattrack,
        isSouvenir: item.isSouvenir,

        user: currentUser
      });

      newItem.save();

      currentUser.get('items').pushObject(newItem);
    }
  }
});
