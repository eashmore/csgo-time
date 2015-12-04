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
their item value's price (lowest to highest)
* `winBets` is an array of all the bets placed on the winning team sorted by
total value of winnings

<pre><code>
var expensiveItems = {};

function distributeItems(items) {
  var itemKeys = Object.keys(items);
  itemKeys = itemKeys.sort(function(a, b) {
      return b - a;
    })

  while(itemKeys.length) {
    var firstKey = itemKeys[0];
    var itemPrice = items[firstKey].get('price');

    if (itemPrice > largestPayout) {
      var handledItem = itemKeys.shift();
      expensiveItems[handledItem] = items[handledItem];
      delete items[handledItem];
      continue;
    }

    for(var i = 0; i < winningBets.length; i++) {
      var userCurrentPayout = winningBets[i].get('payout');

      if (itemPrice <= userCurrentPayout) {
        payUser(items[firstKey], winningBets[i]);

        var newPayout = userCurrentPayout - itemPrice;
        winningBets[i].set('payout', newPayout);

        if (userCurrentPayout > winningBets[i].get('payout')) {
          largestPayout = winningBets[i].get('payout');
        }

        var handledBets = winningBets.shift();
        winningBets.push(handledBets);

        itemKeys.shift();
        break;
      }
    }
  }

  distributeExpensiveItems();
}
</code></pre>

`distributeExpensiveItems` will then attempt to payout items to expensive to
distributed evenly are as fairly as it can by giving them to the users with the
highest remaining payout.

<pre><code>
function distributeExpensiveItems() {
  var expensiveKeys = Object.keys(expensiveItems);
  while (expensiveKeys.length) {
    var max = null;
    for (var i = 0; i < winningBets.length; i++) {
      if (max === null || winningBets[i].get('payout') > max) {
        max = winningBets[i];
      }
    }

    payUser(expensiveItems[expensiveKeys[0]], max);
    expensiveKeys.shift();
  }
}
</code></pre>
