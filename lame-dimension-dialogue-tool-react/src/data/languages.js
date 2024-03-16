export const languages = ['en', 'es', 'jp', 'fr', 'br', 'ch', 'de', 'ru'];

export const createLanguageObject = (initialValue) => {
    let obj = {};
    languages.forEach((language) => {
        obj[language] = initialValue;
    });
}