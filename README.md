# Dropshipping-Script-Pixel-Facebook
Script para o evento de Purchase no Facebook Pixel.

### Instalação
1. Siga as orientações indicadas no video do youtube.

[![Watch the video](https://img.youtube.com/vi/cGlBWhMFkV8/hqdefault.jpg)](https://youtu.be/cGlBWhMFkV8)

2. Conpie e cole o `script.js` para desparar eventos Purchase automaticamente.

   ```JS
   javascript: (function() {

    var str;
    function procurarAtributo(keyWord) {
        var keyEncontrada = false;
        var valueReturn;

        const regex = /(?:\"|\')(?<key>[^"]*)(?:\"|\')(?=:)(?:\:\s*)(?:\"|\')?(?<value>true|false|[0-9a-zA-Z\+\-\,\.\$]*)/gm;
        let m;

        while ((m = regex.exec(str)) !== null) {
            // Isso é necessário para evitar loops infinitos com correspondências de largura zero
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // O resultado pode ser acessado através da variável 'm'.
            m.forEach((match, groupIndex) => {
                //console.log(`Correspondência encontrada, grupo ${groupIndex}: ${match}`);
                if (groupIndex == 1 && match == keyWord) {
                    keyEncontrada = true;
                }
                if (keyEncontrada == true && groupIndex == 2) {
                    keyEncontrada = false;
                    valueReturn = match;
                }

            });
        }
        return valueReturn;
    }

    var analyticsText = document.querySelector('.analytics');
    if (analyticsText != undefined) {
        str = analyticsText.text;
        var productId = procurarAtributo('productId').replace(",", "");
        var productValue = procurarAtributo('revenue').replace(",", "");

        fbq('track', 'Purchase', {
            content_type: 'product_group',
            content_ids: '[' + productId + ']',
            value: productValue,
            num_items: 1,
            currency: 'USD',
        });

        console.log(`SUCESSO: O pixel de PURCHASE foi enviado com sucesso.\nProdutoId: ${productId} \nValue: ${productValue}`);
        alert("SUCESSO: O pixel de PURCHASE foi enviado com sucesso para o content ID: " + productId + ".");
    } else {
        alert("ERRO: Não foi possivel enviar o pixel de PURCHASE.");
    }

   })();
   ```
3. Versão desatualizada
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
