# Payout Algorithm
Implemented in Ember Matches Controller

* `target` is amount to payout
* `items` is an Ember array of item objects sorted by price (highest to lowest)

<pre><code>
function getPayout(target, items) {
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
