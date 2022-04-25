
import java.util.Random;
import java.util.HashMap;
import java.util.Map;

public class Codec {

    private static final int sizeEncoding = 6;
    private static final int numberOfEncodingCharacters = 62; //[0-9] + [a-z] + [A-Z] = 62
    private static final char[] encodingCharacters = new char[numberOfEncodingCharacters];
    private static final String shortPrefix = "http://tinyurl.com/";

    private final Map<String, String> encodingToLongURL;
    private final Random random;

    Codec() {
        encodingToLongURL = new HashMap<>();
        random = new Random();
        fill_encodingCharacters();
    }

    public String encode(String longURL) {
        char[] encoding = new char[sizeEncoding];
        do {
            for (int i = 0; i < sizeEncoding; ++i) {
                encoding[i] = encodingCharacters[random.nextInt(encodingCharacters.length)];
            }
        } while (encodingToLongURL.containsKey(String.valueOf(encoding)));

        String encodingTinyURL = String.valueOf(encoding);
        encodingToLongURL.put(encodingTinyURL, longURL);
        return shortPrefix + encodingTinyURL;
    }

    public String decode(String shortURL) {
        return encodingToLongURL.get(shortURL.replaceFirst(shortPrefix, ""));
    }

    private static void fill_encodingCharacters() {
        int groupsOfEncodingCharacters = 3;//[0-9][a-z][A-Z]
        char startChar = 0, endChar = 0;
        int index = 0;

        while (groupsOfEncodingCharacters > 0) {
            switch (groupsOfEncodingCharacters) {
                case 3 -> {
                    startChar = '0';
                    endChar = '9';
                }
                case 2 -> {
                    startChar = 'a';
                    endChar = 'z';
                }
                case 1 -> {
                    startChar = 'A';
                    endChar = 'Z';
                }
            }

            for (char ch = startChar; ch <= endChar; ++ch) {
                encodingCharacters[index++] = ch;
            }
            --groupsOfEncodingCharacters;
        }
    }
}
