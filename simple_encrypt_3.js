const region = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .'.split('');

function encrypt(text) {
    if(!text) {
        return text;
    }

    checkValidChars(text);

    let result = '';
    for(let i = 0; i < text.length; i++) {
        let currentBits = getBitsFromChar(text[i]);
        let nextBits = getBitsFromChar(text[i+1]);
        let [newCurrentBits, newNextBits] = step1(currentBits, nextBits);
        if(newNextBits) {
            let textArr = text.split('');
            textArr[i+1] = getCharFromBits(newNextBits);
            text = textArr.join('');
        }

        newCurrentBits = step2(newCurrentBits);
        newCurrentBits = step3(newCurrentBits);
        newCurrentBits = step4(newCurrentBits);
        newCurrentBits = step5(newCurrentBits);
        newCurrentBits = step6(newCurrentBits);

        result += getCharFromBits(newCurrentBits);
    }

    return result;
}

function decrypt(encryptedText) {
    if(!encryptedText) {
        return encryptedText;
    }

    checkValidChars(encryptedText);
    
    let result = "";
    for(let i = encryptedText.length - 1; i >= 0; i--) {
        let currentBits = getBitsFromChar(encryptedText[i]);
        let nextBits = getBitsFromChar(result[0]);
        currentBits = step6(currentBits);
        currentBits = step5(currentBits);
        currentBits = step4(currentBits);
        currentBits = step3(currentBits);
        currentBits = step2(currentBits);
        let [newCurrentBits, newNextBits] = step1(currentBits, nextBits);
        if(newNextBits) {
            let resultArr = result.split('');
            resultArr[0] = getCharFromBits(newNextBits);
            result = resultArr.join('');
        }
        result = getCharFromBits(newCurrentBits) + result;
    }

    return result;
}

function step1(currentBits, nextBits) {
    if(!nextBits) {
        return [currentBits, null];
    }

    let newCurrentBits = currentBits.split('');
    let newNextBits = nextBits.split('');
    let temp = newCurrentBits[4];
    newCurrentBits[4] = newNextBits[0];
    newNextBits[0] = temp;

    return [newCurrentBits.join(''), newNextBits.join('')];
}

function step2(currentBits) {
    //Invert the 2nd and 4th bits
    let newCurrentBits = currentBits.split('');
    newCurrentBits[1] = newCurrentBits[1] == '0' ? '1' : '0';
    newCurrentBits[3] = newCurrentBits[3] == '0' ? '1' : '0';
    return newCurrentBits.join('');
}

function step3(currentBits) {
    let newCurrentBits = currentBits.substring(3) + currentBits.substring(0, 3);
    return newCurrentBits;
}

function step4(currentBits) {
    let newCurrentBits = swapBits(currentBits, 0, 1);
    newCurrentBits = swapBits(newCurrentBits, 2, 3);
    newCurrentBits = swapBits(newCurrentBits, 4, 5);
    return newCurrentBits;
}

function step5(currentBits) {
    return currentBits.split('').reverse().join('');
}

function step6(currentBits) {
    let newCurrentBits = swapBits(currentBits, 0, 2);
    return newCurrentBits;
}

function getCharFromBits(bits) {
    let index = 0;
    let base = 32;
    for (let i = 0; i < bits.length; i++) {
        if(bits[i] == '1') {
            index += base;
        }
        base /= 2;
    };

    return region[index];

}

function getBitsFromChar(char) {
    if(!char) {
        return null;
    }
    let index = region.indexOf(char);
    return Number(index).toString(2).padStart(6, '0');
}

function swapBits(currentBits, firstIndex, secondIndex) {
    let newCurrentBits = currentBits.split('');
    let temp = newCurrentBits[firstIndex];
    newCurrentBits[firstIndex] = newCurrentBits[secondIndex];
    newCurrentBits[secondIndex] = temp;
    return newCurrentBits.join('');
}

function checkValidChars(text) {
    for(let i = 0; i < text.length; i++) {
        if(region.indexOf(text[i]) == -1) {
            throw new Error();
        }
    }
}

console.log(decrypt("rfR9qRVMT8TUfeyXGXdrLUcT.dUmVd5xUNo1oRdZQ1dtUXs1QVmRL8RMVt9RHqRtU1Ps1LtPQXVdbpZ9Lfp1"));