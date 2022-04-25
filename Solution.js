
class URL_TOOLS_SETUP {

    constructor() {
        this.sizeEncoding = 6;
        this.numberOfEncodingCharacters = 62; //[0-9] + [a-z] + [A-Z] = 62
        this.encodingCharacters = new Array(this.numberOfEncodingCharacters);
        this.shortPrefix = "http://tinyurl.com/";
        this.encodingToLongURL = new Map();
        this.fill_encodingCharacters();
    }

    fill_encodingCharacters() {
        let groupsOfEncodingCharacters = 3;//[0-9][a-z][A-Z]
        let startChar = 0, endChar = 0;
        let index = 0;

        while (groupsOfEncodingCharacters > 0) {
            switch (groupsOfEncodingCharacters) {
                case 3:
                    startChar = '0'.codePointAt(0);
                    endChar = '9'.codePointAt(0);
                    break;
                case 2:
                    startChar = 'a'.codePointAt(0);
                    endChar = 'z'.codePointAt(0);
                    break;
                case 1:
                    startChar = 'A'.codePointAt(0);
                    endChar = 'Z'.codePointAt(0);
            }

            for (let asciiCode = startChar; asciiCode <= endChar; ++asciiCode) {
                this.encodingCharacters[index++] = String.fromCodePoint(asciiCode);
            }
            --groupsOfEncodingCharacters;
        }
    }
}

const urlTools = new URL_TOOLS_SETUP();

/**
 * @param {string} longURL
 * @return {string}
 */
var encode = function (longURL) {
    const encoding = new Array(urlTools.sizeEncoding);
    do {
        for (let i = 0; i < urlTools.sizeEncoding; ++i) {
            let index = Math.floor(Math.random() * urlTools.encodingCharacters.length);
            encoding[i] = urlTools.encodingCharacters[index];
        }
    } while (urlTools.encodingToLongURL.has(encoding.join('')));

    const encodingTinyURL = encoding.join('');

    urlTools.encodingToLongURL.set(encodingTinyURL, longURL);
    return urlTools.shortPrefix + encodingTinyURL;
};

/**
 * @param {string} shortURL
 * @return {string}
 */
var decode = function (shortURL) {
    return urlTools.encodingToLongURL.get(shortURL.replace(urlTools.shortPrefix, ""));
};
