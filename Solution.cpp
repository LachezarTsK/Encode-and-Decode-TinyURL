
#include <string>
#include <algorithm>
#include <random>
#include <array>
using namespace std;

class Solution {
    
    inline static const int sizeEncoding = 6;
    inline static const int numberOfEncodingCharacters = 62; //[0-9] + [a-z] + [A-Z] = 62
    inline static array<char, numberOfEncodingCharacters> encodingCharacters;
    inline static const string shortPrefix = "http://tinyurl.com/";

    unordered_map <string, string> encodingToLongURL;
    random_device randomDevice;


public:
    Solution() {
        fill_encodingCharacters();
    }

    string encode(string longURL) {
        string encoding;
        do {
            encoding = "";
            for (int i = 0; i < sizeEncoding; ++i) {
                encoding.push_back(encodingCharacters[randomDevice() % numberOfEncodingCharacters]);
            }
            //C++20: encodingToLongURL.contains(encoding)
        } while (encodingToLongURL.find(encoding) != encodingToLongURL.end());

        encodingToLongURL[encoding] = longURL;
        return shortPrefix + encoding;
    }

    string decode(string shortURL) {
        return encodingToLongURL[shortURL.replace(shortURL.find(shortPrefix), shortPrefix.length(), "")];
    }

    static void fill_encodingCharacters() {
        int groupsOfEncodingCharacters = 3; //[0-9][a-z][A-Z]
        char startChar = 0, endChar = 0;
        int index = 0;

        while (groupsOfEncodingCharacters > 0) {
            switch (groupsOfEncodingCharacters) {
                case 3:
                    startChar = '0';
                    endChar = '9';
                    break;
                case 2:
                    startChar = 'a';
                    endChar = 'z';
                    break;
                case 1:
                    startChar = 'A';
                    endChar = 'Z';
            }

            for (char ch = startChar; ch <= endChar; ++ch) {
                encodingCharacters[index++] = ch;
            }
            --groupsOfEncodingCharacters;
        }
    }
};
