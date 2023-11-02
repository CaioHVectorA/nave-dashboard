export default function hasWindow() {
    if (process.browser) {
        // Código executado no navegador
        return !!window;
    } else {
        // Código executado no servidor (build)
        return typeof window !== "undefined";
    }
}