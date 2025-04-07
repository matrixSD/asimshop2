const usdRateInput = document.getElementById('usdRate');
const usdPrices = document.querySelectorAll('.usd-price');
const localPrices = document.querySelectorAll('.local-price');

function calculateLocalPrices() {
    const usdRate = parseFloat(usdRateInput.value) || 0;

    usdPrices.forEach((usdPrice, index) => {
        const usdPriceValue = parseFloat(usdPrice.textContent) || 0;
        const localPrice = usdRate * usdPriceValue;
        localPrices[index].textContent = localPrice.toFixed(2);
    });
}

usdRateInput.addEventListener('input', calculateLocalPrices);

// حساب الأسعار الأولية عند تحميل الصفحة
calculateLocalPrices();
