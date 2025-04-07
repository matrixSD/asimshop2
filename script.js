const usdRateInput = document.getElementById('usdRate');
const usdPrices = document.querySelectorAll('.usd-price');
const localPrices = document.querySelectorAll('.local-price');
const copyButton = document.getElementById('copyButton');

function calculateLocalPrices() {
    const usdRate = parseFloat(usdRateInput.value) || 0;

    usdPrices.forEach((usdPrice, index) => {
        const usdPriceValue = parseFloat(usdPrice.textContent) || 0;
        const localPrice = usdRate * usdPriceValue;
        localPrices[index].textContent = localPrice.toFixed();
    });
}

usdRateInput.addEventListener('input', calculateLocalPrices);

// حساب الأسعار الأولية عند تحميل الصفحة
calculateLocalPrices();

// وظيفة نسخ النتائج
copyButton.addEventListener('click', () => {
    let textToCopy = '';
    const productRows = document.querySelectorAll('#products tbody tr');

    productRows.forEach(row => {
        const productName = row.querySelector('td:nth-child(1)').textContent;
        const localPrice = row.querySelector('.local-price').textContent;
        textToCopy += `${productName}: ${localPrice}\n`;
    });

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('تم نسخ النتائج إلى الحافظة!');
        })
        .catch(err => {
            console.error('فشل في نسخ النص: ', err);
            alert('فشل في نسخ النتائج.');
        });
});
