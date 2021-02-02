
function procurarAtributo(keyWord, text) {
    var str = text;
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

function injetarPurchase() {
    var analyticsText = document.querySelector('.analytics');
    if (analyticsText != undefined) {
        var productId = procurarAtributo('productId', analyticsText.text).replace(",", "");
        var productValue = procurarAtributo('revenue', analyticsText.text).replace(",", "");

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
}
