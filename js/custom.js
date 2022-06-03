/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function (n, s = '.', c = ',') {
  var x = 3;
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}

function autoNumericInit() {
  $('input.currency').autoNumeric('init', {
    aSep: '.',
    aDec: ','
  })

  $('form').on('submit', (e) => {
    $('input.currency').each(function (i) {
      var self = $(this);
      try {
        var v = self.autoNumeric('get');
        self.autoNumeric('destroy');
        self.val(v);
      } catch (err) {
        console.log("Not an autonumeric field: " + self.attr("name"));
      }
    });
    return true;
  });
}

autoNumericInit()