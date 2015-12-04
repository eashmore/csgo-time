# Rake Algorithm
Implemented in Ember matches.current controller

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
Implemented in Ember matches.current controller

* `items` is a hash of item objects in the betting pool. Keys are ordered by
their item value's price (highest to lowest)
* `winBets` is an array of all the bets placed on the winning team sorted by
total value of winnings (highest to lowest)
* `payUser()` adds the item to the user's stash and disassociates it with the
current match
* `updatePayout()` redetermines the total value of a user's payout after an item
is removed from the pool. This is done to ensure a more even distribution across
all winning users

<pre><code>
function distributeItems(items) {
  var itemKeys = Object.keys(items);
  itemKeys = itemKeys.sort(function(a, b) {
    return a - b;
  });

  while(itemKeys.length) {
    var firstKey = itemKeys[0];

    var maxBet = null;
    for (var i = 0; i < winningBets.length; i++) {
      if (maxBet === null || winningBets[i].get('payout') > maxBet.get('payout')) {
        maxBet = winningBets[i];
      }
    }

    payUser(items[firstKey], maxBet);
    if (maxBet.get('payout') - items[firstKey].get('price') <= 0) {
      var idx = winningBets.indexOf(maxBet);
      winningBets.splice(idx, 1);
    }

    updatePayout(items[firstKey], maxBet);
    itemKeys.shift();
  }
}
</code></pre>
