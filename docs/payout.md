# Rake Algorithm
Implemented in Ember Matches Controller

* `target` is amount to payout
* `items` is an Ember array of item objects sorted by price (highest to lowest)

<pre><code>
function getRake(target, items) {
  target = (Math.round(target * 100)) / 100;
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
    var remainingItems = items.slice(i, items.length);

    var currentPayout = this.getPayout(remainder, remainingItems);
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

* `itemsList` is an array of all the bet item sorted by price
* `winBets` is an array of all the bets placed on the winning team sorted by price value of winnings

<pre><code>
var distributeItems = function(itemsList) {
  while(itemsList.length) {
    var itemPrice = itemsList[0].get('price');

    if (itemPrice > largestPayout) {
      var handledItem = itemsList.shift();
      expensiveItems.push(handledItem);
      continue;
    }

    for(var i = 0; i < winBets.length; i++) {
      var userCurrentPayout = winBets[i].get('payout');

      if (itemPrice <= userCurrentPayout) {
        payUser(itemsList[0], winBets[i]);

        var newPayout = userCurrentPayout - itemPrice;
        winBets[i].set('payout', newPayout);

        if (userCurrentPayout > winBets[i].get('payout')) {
          largestPayout = winBets[i].get('payout');
        }

        var handledBet = winBets.shift();
        winBets.push(handledBet);

        itemsList.shift();
        break;
      }
    }
  }
</code></pre>

`distributeItems` will then compare any items too expensive to evenly distribute to its calculated rake. If the value of the extra items are larger then the rake value, it will redistribute it's calculated rake and take the expensive items as its rake instead.

<pre><code>
  if (expensiveItems.length && expensiveItems[0].get('price') > cutValue) {
    cutValue = expensiveItems[0].get('price');
    sortItems(cutItems);
    cutItems = expensiveItems;
  }
};

</code></pre>
