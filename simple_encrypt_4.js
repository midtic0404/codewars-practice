const region0 = 'qwertyuiop'.split('');
const region1 = 'asdfghjkl'.split('');
const region2 = 'zxcvbnm,.'.split('');
const regions = [region0, region1, region2];

function encrypt(text, key) {
    let result = '';
    const keyArray = getFormattedKeyArray(key);
    for(let i = 0; i < text.length; i++) {
        let currentRegion = getRegion(text[i].toLowerCase());
        if(currentRegion === null) {
            result += text[i];
            continue;
        }
        let currentIndex = getCurrentIndex(currentRegion, text[i].toLowerCase());
        let newIndex = (currentIndex + keyArray[currentRegion]) % regions[currentRegion].length;
        let newChar = regions[currentRegion][newIndex];
        newChar = getCorrectCase(text[i], newChar);
        result += newChar;
    }

    return result;
}

function decrypt(text, key) {
    let result = '';
    const keyArray = getFormattedKeyArray(key);
    for(let i = 0; i < text.length; i++) {
        let currentRegion = getRegion(text[i].toLowerCase());
        if(currentRegion === null) {
            result += text[i];
            continue;
        }
        let currentIndex = getCurrentIndex(currentRegion, text[i].toLowerCase());
        let newIndex = (currentIndex - keyArray[currentRegion]) % regions[currentRegion].length;
        
        if(newIndex < 0) {
            newIndex += regions[currentRegion].length;
        }
        let newChar = regions[currentRegion][newIndex];
        newChar = getCorrectCase(text[i], newChar);
        result += newChar;
    }

    return result;
}

function getFormattedKeyArray(key) {
    return key.toString().padStart(3, '0').split('').map((num) => parseInt(num));
}

function getRegion(char) {
    if(char == '<' || char == '>') {
        return 2;
    }

    if(region0.indexOf(char) != -1) {
        console.log('should see this');
        return 0;
    }
    if(region1.indexOf(char) != -1) {
        return 1;
    }
    if(region2.indexOf(char) != -1) {
        return 2;
    }

    return null;
}

function getCurrentIndex(region, char) {
    if(char == '<') {
        return regions[region].indexOf(',');
    }

    if(char == '>') {
        return regions[region].indexOf('.');
    }

    return regions[region].indexOf(char);
}

function getCorrectCase(originalChar, newChar) {
    if(originalChar == '<' || originalChar == '>') {
        if(newChar == ',') {
            return '<';
        }
        if(newChar == '.') {
            return '>';
        }

        return newChar.toUpperCase();
    }

    if(originalChar == ',' || originalChar == '.') {
        return newChar;
    }

    if(originalChar == originalChar.toUpperCase()) {
        if(newChar == ',') {
            return '<';
        }

        if(newChar == '.') {
            return '>';
        }

        return newChar.toUpperCase();
    }

    return newChar;

}



console.log(decrypt('Sr pgi jlpl Jr,lqlage Zlow Piapc I.skiaa dw. l.s ibnepizi.p ugi. de.se.f l arkwper.c', 583));