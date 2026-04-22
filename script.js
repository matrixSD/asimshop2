const usdRateInput = document.getElementById('usdRate');
const usdPrices = document.querySelectorAll('.usd-price');
const localPrices = document.querySelectorAll('.local-price');
const copyButton = document.getElementById('copyButton');

function calculateLocalPrices() {
    const usdRate = parseFloat(usdRateInput.value) || 0;

    usdPrices.forEach((usdPrice, index) => {
        const usdPriceValue = parseFloat(usdPrice.textContent) || 0;
        const localPrice = usdRate * usdPriceValue;
        // تقريب لأقرب 100 لتسهيل الأرقام للعميل
        localPrices[index].textContent = Math.round(localPrice).toLocaleString();
    });
}

usdRateInput.addEventListener('input', calculateLocalPrices);
calculateLocalPrices();

copyButton.addEventListener('click', () => {
    const sName = document.getElementById('storeName').value;
    const sLink = document.getElementById('channelLink').value;
    const sPhone = document.getElementById('phoneNum').value;

    let textToCopy = `🎯 أسعار شحن عملات TikTok - ${sName} 🎯\n`;
    textToCopy += `⏱️ شحن فوري ولحظي — بدون انتظار!\n`;
    textToCopy += `✅ آمن 100% — عبر الآيدي (ID) فقط\n`;
    textToCopy += `💰 عروض خاصة — أسعار حصرية! 💰\n\n`;

    const rows = document.querySelectorAll('#products tbody tr');
    
    rows.forEach(row => {
        if(row.classList.contains('category')) {
            textToCopy += `\n--- ${row.getAttribute('data-name')} — وفّر أكثر! ---\n`;
        }
        
        const productName = row.querySelector('td:nth-child(1)').textContent;
        const localPrice = row.querySelector('.local-price').textContent;
        textToCopy += `🔹 ${productName} — ${localPrice} جنيه\n`;
    });

    textToCopy += `\n🔗 رابط القناة: ${sLink}`;
    textToCopy += `\n📞 للطلب والشحن الفوري:\n📱 واتساب: ${sPhone}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('تم تجهيز القائمة ونسخها بنجاح! ✅');
    });
});
