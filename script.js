const usdRateInput = document.getElementById('usdRate');
const usdPrices = document.querySelectorAll('.usd-price');
const localPrices = document.querySelectorAll('.local-price');
const copyButton = document.getElementById('copyButton');

// دالة حساب الأسعار المحلية بناءً على سعر الصرف
function calculateLocalPrices() {
    const usdRate = parseFloat(usdRateInput.value) || 0;

    usdPrices.forEach((usdPrice, index) => {
        const usdPriceValue = parseFloat(usdPrice.textContent) || 0;
        const localPrice = usdRate * usdPriceValue;
        // التقريب وتنسيق الرقم بفاصلة الآلاف
        localPrices[index].textContent = Math.round(localPrice).toLocaleString();
    });
}

usdRateInput.addEventListener('input', calculateLocalPrices);
calculateLocalPrices(); // الحساب عند التشغيل

// وظيفة النسخ المطور لدمج الحقول وتشكيل القائمة
copyButton.addEventListener('click', () => {
    // جلب القيم الحالية من الحقول العلوية
    const storeName = document.getElementById('storeName').value || "متجر زولنا";
    const channelLink = document.getElementById('channelLink').value || "";
    const phoneNum = document.getElementById('phoneNum').value || "";

    // بداية بناء النص المنسق
    let textToCopy = `🎯 أسعار شحن عملات TikTok - ${storeName} 🎯\n`;
    textToCopy += `⏱️ شحن فوري ولحظي — بدون انتظار!\n`;
    textToCopy += `✅ آمن 100% — عبر الآيدي (ID) فقط\n`;
    textToCopy += `💰 عروض خاصة — أسعار حصرية! 💰\n`;

    const rows = document.querySelectorAll('#products tbody tr');
    
    rows.forEach(row => {
        // التحقق مما إذا كان السطر يمثل "فئة" (العناوين الفرعية)
        if(row.classList.contains('category')) {
            const categoryName = row.getAttribute('data-name');
            textToCopy += `\n--- ${categoryName} — وفّر أكثر! ---\n`;
        }
        
        const productName = row.querySelector('td:nth-child(1)').textContent;
        const localPrice = row.querySelector('.local-price').textContent;
        
        // إضافة المنتجات تحت كل فئة
        textToCopy += `🔹 ${productName} — ${localPrice} جنيه\n`;
    });

    // إضافة التذييل (الرابط والرقم)
    textToCopy += `\n🔥\n`;
    if(channelLink) {
        textToCopy += `🔗 رابط القناة: ${channelLink}\n`;
    }
    textToCopy += `📞 للطلب والشحن الفوري:\n📱 واتساب: ${phoneNum}`;

    // تنفيذ عملية النسخ للحافظة
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('✅ تم نسخ القائمة بنجاح! جاهزة للإرسال على واتساب.');
        })
        .catch(err => {
            console.error('فشل في النسخ: ', err);
            alert('❌ حدث خطأ أثناء النسخ.');
        });
});
