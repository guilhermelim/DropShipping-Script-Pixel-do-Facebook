# Dropshipping-Script-Pixel-Facebook
Script para o evento de Purchase no Facebook Pixel.

### Instalação
1. Siga as orientações indicadas no video do youtube.

[![Watch the video](https://img.youtube.com/vi/cGlBWhMFkV8/hqdefault.jpg)](https://youtu.be/cGlBWhMFkV8)

2. Conpie e cole o `script.js` para desparar eventos Purchase automaticamente.
   ```JS
   javascript: (function() {
    var productTable = document.querySelector('.product-table .product');
    if (productTable != undefined) {
        var productId = productTable.getAttribute('data-product-id');
        var productValue = productTable.querySelector('.product__price span').innerText.replace("$", "");

        fbq('track', 'Purchase', {
            content_type: 'product_group',
            content_ids: '[' + productId + ']',
            value: productValue,
            num_items: 1,
            currency: 'USD',
        });

        alert("SUCESSO: O pixel de PURCHASE foi ativado com sucesso para o content ID: " + productId + ".");
    } else {
        alert("ERRO: Não foi possivel enviar o pixel de PURCHASE.");
    }
   })();
   ```
3. Versão desatualizada mostrada no video
   ```JS
   javascript: (function() {
    var codigo = document.getElementById("ProductJson-product-template");
    if (codigo == undefined) {
        content_id = meta["product"]["id"];
    } else {
        var content_id = JSON.parse(codigo.text)["id"].toString();
    }
    fbq('track', 'Purchase', {
        content_type: 'product_group',
        content_ids: '[' + content_id + ']',
        value: 99.00,
        num_items: 1,
        currency: 'USD',
    });
    console.log("O pixel de PUR foi ativado com sucesso para o content ID: " + content_id);
   })();
   ```
