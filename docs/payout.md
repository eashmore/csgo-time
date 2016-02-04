# Rake Algorithm
Website takes 15% rake on total prize pool. Implemented in Ember
matches.current controller.

* `target` is the total value of the rake
* `items` is an array of item objects sorted by price (highest to lowest)

<pre><code>
function takeRake(target, items) {
  target = (Math.round(target * 100)) / 100;

  if (items.length < 1) {
    return null;
  }

  if (target <= 0) {
    return [];
  }

  var payout = [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var price = item.get('price');

    if (price > target) {
      continue;
    }

    var remainder = target - price;
    var remainingItems = items.slice(i + 1, items.length);

    var currentPayout = takeRake(remainder, remainingItems);
    if (!currentPayout) {
      continue;
    }

    payout = [items[i]].concat(currentPayout);
    return payout;
  }

  return payout;
}
</code></pre>

#Payout Algorithm
Pays out prize pool ti winning users. Implemented in Ember matches.current
controller.

* `items` is a hash of item objects in the betting pool. Keys are ordered by
their item value's price (highest to lowest)
* `winBets` is an array of all the bets placed on the winning team sorted by
total value of winnings (highest to lowest)
* `payUser()` adds the item to the user's stash and disassociates it with the
current match

<pre><code>
function distributeItems(items) {
  var itemKeys = Object.keys(items);
  itemKeys = itemKeys.sort(function(a, b) {
    return b - a;
  });

  while(itemKeys.length) {
    var currentKey = itemKeys[itemKeys.length - 1];

    var max = null;
    for (var i = 0; i < winningBets.length; i++) {
      if (max === null || winningBets[i].get('payout') > max.get('payout')) {
        max = winningBets[i];
      }
    }

    payUser(items[currentKey], max);
    var newPayout = max.get('payout') - items[currentKey].get('price');
    max.set('payout', newPayout);

    if (max.get('payout') <= 0) {
      var idx = winningBets.indexOf(max);
      winningBets.splice(idx, 1);

      if (!winningBets.length) {
        break;
      }
    }

    itemKeys.pop();
  }
}
</code></pre>
