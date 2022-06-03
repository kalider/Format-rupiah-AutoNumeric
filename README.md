# Implementasi format rupiah menggunakan librari AutoNumeric

## Librari yang dipakai
- [JQuery v3.6](https://jquery.com/ "JQuery")
- AutoNumeric v1.9.* [Download](https://github.com/autoNumeric/autoNumeric/releases/tag/1.9.46) / [Docs](http://www.decorplanit.com/plugin/)
- [Bootstrap v4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/) (Untuk mempercantik tampilan contoh)

## Untuk form yang dibuat global 
```javascript
function autoNumericInit() {
  // Deklarasi untuk form yang memuat class `currency`
  $('input.currency').autoNumeric('init', {
    aSep: '.',
    aDec: ','
  })

  // Mengubah isi masukan dari bentuk format rupiah kedalam bentuk numerik ketika form di-submit
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
```

## Implementasi pada form yang bisa ditambah baris
Lihat contoh pengkodean pada berkas `form-add-row.html`
