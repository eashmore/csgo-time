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

* `sortedItems` is an array of all the bet item sorted by price
* `winBets` is an array of all the bets placed on the winning team
* `payoutRatio` is the total value of bets on winner over total value of bets in the prize pool

<pre><code>
winBets.forEach(function(bet) {
  var payout = bet.get('totalValue') * payoutRatio;
  bet.set('payout', payout);
});

var betIdx = 0;
winBets = winBets.sort(function(a, b) {
  return b.get('payout') - a.get('payout');
});

while (sortedItems.length) {
  if (sortedItems[0].get('price') >= winBets[betIdx].get('payout')) {
    payUser(sortedItems[0], winBets[0]);

    var newPayout = winBets[betIdx].get('payout') - sortedItems[0].get('price');
    winBets[betIdx].set('payout', newPayout);

    var handledBet = winBets.shift();
    winBets.push(handledBet);
    sortedItems.shift();

    betIdx = 0;
  } else {
    betIdx++;
  }
}
</code></pre>
