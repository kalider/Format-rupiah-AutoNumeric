const tableForm = $('#form-add-row-table');
var row = 0;

function addRow(row) {
  tableForm.find('tbody').append(`<tr>
      <td><input type="text" name="products[${row}]['name']" id="nameInput${row}"
              class="form-control" required></td>
      <td><input type="number" name="products[${row}]['qty']" min="1" value="1" id="qtyInput${row}"
              class="form-control qty-input" required></td>
      <td><input type="text" name="products[${row}]['price']" id="priceInput${row}"
              class="form-control currency text-right price-input" required></td>
      <td class="text-right"><input type="hidden" name="products[${row}]['total']" id="totalInput${row}"
              class="form-control text-right total-input"><span class="total-span">0,00</span></td>
      <td><a href="#" class="btn btn-danger btn-row-delete">Delete</a></td>
  </tr>`)

  autoNumericInit()
}

addRow(0)

function calculateTotal() {
  var total = 0;

  tableForm.find('tbody tr').each(function (i, element) {
    var price = parseFloat($(element).find('.price-input').autoNumeric('get'))

    if (isNaN(price)) price = 0

    var qty = parseInt($(element).find('.qty-input').val())
    var totalPrice = parseFloat((price * qty).toFixed(2))

    $(element).find('.total-span').text(totalPrice.format(2))
    $(element).find('.total-input').val(totalPrice)

    total += totalPrice
  })

  $('#totalPrices').text(total.format(2))
}

$('.btn-row-add').click(function (e) {
  e.preventDefault()

  row += 1;

  addRow(row)
})

$(document).on('click', '.btn-row-delete', function (e) {
  e.preventDefault()

  $(this).closest('tr').remove()

  calculateTotal()

  if (tableForm.find('tbody tr').length == 0) addRow(0)
})

$(document).on('change keyup', '.price-input, .qty-input', function () {
  calculateTotal()
})