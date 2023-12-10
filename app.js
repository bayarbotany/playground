const _ = require('lodash');

//Write a program that encrypt /decrypt a message using Vigenère cipher then transpose it using simple transposition using the send to concept.

//user inputs 1 for encryption, 2 for decryption
//user inputs the plaintext or ciphertext
//key is hardcoded
//output is the ciphertext or plaintext

const KEY = "YES";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//Vigenere Cipher

//encrypt letter 
const cypherVigenereLetter = (letter, index) => {
    let letterNumber = ALPHABET.indexOf(letter) ;
     let keyLetter = KEY[index % KEY.length];
     let keyNumber = ALPHABET.indexOf(keyLetter);
     let cypheredNumber = (letterNumber + keyNumber) % ALPHABET.length;
     let cypheredLetter = ALPHABET[cypheredNumber];
 
     return cypheredLetter;
 }
 
 const cypherVigenereText = (text) => {
     text = text.toUpperCase();
     let cypheredText = "";
     for (let i = 0; i < text.length; i++) {
         let cypheredLetter = cypherVigenereLetter(text[i], i);
         cypheredText += cypheredLetter;
     }
     return cypheredText;
 }

 //decrypt letter
    const decypherVigenereLetter = (letter, index) => {
        let letterNumber = ALPHABET.indexOf(letter) ;
        let keyLetter = KEY[index % KEY.length];
        let keyNumber = ALPHABET.indexOf(keyLetter);
        let temp = letterNumber - keyNumber;
        let cypheredNumber = (
            letterNumber - keyNumber + ALPHABET.length
        ) % ALPHABET.length;
        let cypheredLetter = ALPHABET[cypheredNumber];
    
        return cypheredLetter;
    }

    const decypherVigenereText = (text) => {
        text = text.toUpperCase();
        let cypheredText = "";
        for (let i = 0; i < text.length; i++) {
            let cypheredLetter = decypherVigenereLetter(text[i], i);
            cypheredText += cypheredLetter;
        }
        return cypheredText;
    }



    function createNumericKey(keyword) {
        let sortedKeyword = [...keyword].sort();
        return keyword.split('').map(letter => sortedKeyword.indexOf(letter) + 1);
    }
    
    function simpleTranspositionEncrypt(message) {
        let numericKey = createNumericKey(KEY);
        let blockSize = KEY.length;
        let encryptedMessage = '';
    
        for (let i = 0; i < message.length; i += blockSize) {
            let block = message.substr(i, blockSize).padEnd(blockSize, 'X');
            let encryptedBlock = Array(blockSize).fill(null);
    
            for (let j = 0; j < blockSize; j++) {
                encryptedBlock[numericKey[j] - 1] = block[j];
            }
    
            encryptedMessage += encryptedBlock.join('');
        }
    
        return encryptedMessage;
    }
    
    function simpleTranspositionDecrypt(encryptedMessage) {
        let numericKey = createNumericKey(KEY);
        let blockSize = KEY.length;
        let decryptedMessage = '';
    
        for (let i = 0; i < encryptedMessage.length; i += blockSize) {
            let block = encryptedMessage.substr(i, blockSize);
            let decryptedBlock = Array(blockSize).fill(null);
    
            for (let j = 0; j < blockSize; j++) {
                decryptedBlock[j] = block[numericKey[j] - 1];
            }
    
            decryptedMessage += decryptedBlock.join('');
        }
    
        return decryptedMessage;
    }
    

const runProgram = () => {

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    console.log("Enter 1 for encryption or 2 for decryption");
    process.stdin.on('data', function (text) {
        if (text === '1\n') {
            console.log('plaintext: ');
            process.stdin.on('data', function (text) {
                console.log('ciphertext: ');
                const encryptedText1 = cypherVigenereText(text);
                const encryptedText2 = simpleTranspositionEncrypt(encryptedText1);
                console.log(encryptedText2);

            });
        }
        else if (text === '2\n') {
            console.log('ciphertext: ');
            process.stdin.on('data', function (text) {
                console.log('plaintext: ');
                const decryptedText1 = simpleTranspositionDecrypt(text);
                const decryptedText2 = decypherVigenereText(decryptedText1);
                console.log(decryptedText2);

            });
        }
        else {
            console.log('invalid input');
        }
    });
}

runProgram();