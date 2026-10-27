
export default class Page {

    async open(path = '') {
        const baseUrl = 'https://biblioteca-qa.pages.dev';
        if (path.startsWith('http://') || path.startsWith('https://')) {
            await browser.url(path);
        } else {
            const cleanPath = path.startsWith('/') ? path.slice(1) : path;
            await browser.url(`${baseUrl}/${cleanPath}`);
        }
    }


    async takeScreenshot() {
        return await browser.takeScreenshot();
    }


    async pause(ms = 1000) {
        await browser.pause(ms);
    }
}
