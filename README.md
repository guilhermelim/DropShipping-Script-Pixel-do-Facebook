# Dropshipping-Script-Pixel-Facebook
Script para o evento de Purchase no Facebook Pixel.

### Instalação
2. Siga as orientações indicados no video do youtube.

[![Watch the video](https://img.youtube.com/vi/cGlBWhMFkV8/hqdefault.jpg)](https://youtu.be/cGlBWhMFkV8)

2. Conpie e cole o `script.js` para desparar eventos Purchase automaticamente.
   ```JS
   javascript: (function() {
    var productTable = document.querySelector('.product-table .product');
    var productId = productTable.getAttribute('data-product-id');
    var productValue = productTable.querySelector('.product__price span').innerText.replace("$", "");

    fbq('track', 'Purchase', {
        content_type: 'product_group',
        content_ids: '[' + productId + ']',
        value: productValue,
        num_items: 1,
        currency: 'USD',
    });
    console.log("O pixel de PURCHASE foi ativado com sucesso para o content ID: " + productId);
    })();
   ```
