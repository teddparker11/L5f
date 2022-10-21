console.clear()

var info = [];

// (async () => {await import('https://cdn.jsdelivr.net/gh/teddparker11/L5f/info.js');})();

collectInfo = () => {
    info = [];
    document.querySelectorAll('.appmagic-typed-card').forEach((l) => {
        if (l.querySelector('input')) {
            const s =
                l.textContent.trim().replaceAll('\n', '') +
                ' ' +
                l.querySelector('input').value;
            info.push(s.replace(/[ ]{2,}/g, ' '));
        } else if (l.querySelector('textarea')) {
            const s =
                l.textContent.trim().replaceAll('\n', '') +
                ' ' +
                l.querySelector('textarea').value;
            info.push(s.replace(/[ ]{2,}/g, ' '));
        } else {
            const s = l.textContent.trim().replaceAll('\n', '');
            info.push(s.replace(/[ ]{2,}/g, ' '));
        }
    });
};

waitFor = (sec = 1) => {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, sec * 1000);
    });
}

(async () => {
    const titles = [
        "General info",
        "Business case",
        "Contacts",
        "Financial",
        "Scoring",
        "Attachments",
        "Handover",
        "Approvals",
    ]
    for (let index = 0; index < titles.length; index++) {
        const title = titles[index];
        document.querySelectorAll(".appmagic-button-label")[index + 1].click();
        await waitFor();
        collectInfo();
        info = info.map(i=>i.startsWith("* Name")?`* Name >> ${i.replace("* Name", "")}`: i)
        console.log(`%c${title}%c\n\n${info.join('\n')}`,'color:red', 'color:default');
    }
})();
