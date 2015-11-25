# Rake Algorithm
Implemented in frontend matches.current controller

* `target` is amount to payout
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
Implemented in Ember Matches Controller

* `items` is a hash of item objects in the betting pool. Keys are ordered by
their item value's price
* `winBets` is an array of all the bets placed on the winning team sorted by
price value of winnings

<pre><code>
var expensiveItems = {};

function distributeItems(items) {
  var itemKeys = Object.keys(items);
  var betQueue = winBets;

  while(itemKeys.length) {
    var firstKey = itemKeys[0];
    var itemPrice = items[firstKey].get('price');

    if (itemPrice > largestPayout) {
      var handledItem = itemKeys.shift();
      expensiveItems[handledItem] = items[handledItem];
      delete items[handledItem];
      continue;
    }

    for(var i = 0; i < betQueue.length; i++) {
      var userCurrentPayout = betQueue[i].get('payout');

      if (itemPrice <= userCurrentPayout) {
        payUser(items[firstKey], betQueue[i]);

        var newPayout = userCurrentPayout - itemPrice;
        betQueue[i].set('payout', newPayout);

        if (userCurrentPayout > betQueue[i].get('payout')) {
          largestPayout = betQueue[i].get('payout');
        }

        var handledBets = betQueue.shift();
        betQueue.push(handledBets);

        itemKeys.shift();
        break;
      }
    }
  }
}
</code></pre>

`distributeItems` will then compare any items too expensive to evenly distribute
to its calculated rake. If the value of the extra items are larger then the rake
value, it will redistribute it's calculated rake and take the expensive items as
its rake instead.

* `cutValue` is the total value of the site's 15% cut from the betting pool.
* `cutItems` is a hash containing the site's rake (the `payout` from
the `takeRake` function). Keys are ordered by value item's price.

<pre><code>
var expensiveKeys = Object.keys(expensiveItems);
if (expensiveKeys.length) {
  var totalValueRemaining = 0;
  expensiveKeys.forEach(function(key) {
    totalValueRemaining += expensiveItems[key].get('price');
  });

  if(totalValueRemaining > cutValue) {
    cutValue = totalValueRemaining;
    distributeItems(cutItems);
    cutItems = expensiveItems;
  }
}
</code></pre>
