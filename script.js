const usdRateInput = document.getElementById('usdRate');
const usdPrices = document.querySelectorAll('.usd-price');
const localPrices = document.querySelectorAll('.local-price');
const copyButton = document.getElementById('copyButton');

function calculateLocalPrices() {
    const usdRate = parseFloat(usdRateInput.value) || 0;

    usdPrices.forEach((usdPrice, index) => {
        const usdPriceValue = parseFloat(usdPrice.textContent) || 0;
        let rawPrice = usdRate * usdPriceValue;

        // --- الجبر الصارم للكسور ---
        // نستخدم Math.floor بدلاً من round لضمان عدم زيادة أي جنيه واحد فوق الرقم المقفول
        // التقريب هنا لأقرب 500 جنيه لأسفل
        let roundedPrice = Math.floor(rawPrice / 500) * 500;

        // تحديث العرض في الجدول بفاصلة الآلاف وبدون كسور نهائياً
        localPrices[index].textContent = roundedPrice.toLocaleString();
    });
}

usdRateInput.addEventListener('input', calculateLocalPrices);
calculateLocalPrices();

// وظيفة النسخ (تأخذ السعر المقفل من الجدول مباشرة)
copyButton.addEventListener('click', () => {
    const storeName = document.getElementById('storeName').value;
    const siteUrl = document.getElementById('channelLink').value;
    const phone = document.getElementById('phoneNum').value;

    let textToCopy = `🎯🎯 أسعار شحن عملات TikTok (${storeName}) 🎯🎯\n`;
    textToCopy += `⏱ شحن فوري\n`;
    textToCopy += `✅ آمن 100%\n`;
    textToCopy += `💎 بدون بريد ولا كلمة سر\n`;
    textToCopy += `🔗 الشحن عبر رابط تسجيل الدخول فقط\n`;
    textToCopy += `اقل كمية 200 عملة ✅\n`;

    const rows = document.querySelectorAll('#products tbody tr');
    
    rows.forEach(row => {
        if(row.classList.contains('category')) {
            textToCopy += `\n${row.getAttribute('data-name')}:\n`;
        } else {
            const qty = row.querySelector('td:nth-child(1)').textContent;
            const price = row.querySelector('.local-price').textContent;
            textToCopy += `🔹 ${qty} = ${price}ج\n`;
        }
    });

    textToCopy += `\n🔸 6000 عملة وفوق → العملة بـ 47ج\n`;
    textToCopy += `\n🔄 السعر بيتغير حسب سعر الصرف\n`;
    textToCopy += `📞 واتساب: ${phone}\n`;
    textToCopy += `🌐 الموقع: ${siteUrl}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('✅ تم النسخ بنجاح! جميع الأسعار الآن أرقام مقفولة بدون فكة.');
    });
});
