function binarioADecimal(binario) {
    let decimal = 0;
    for (let i = 0; i < binario.length; i++) {
        decimal += binario[binario.length - 1 - i] * Math.pow(2, i);
    }
    return decimal;
}

function octalADecimal(octal) {
    let decimal = 0;
    for (let i = 0; i < octal.length; i++) {
        decimal += octal[octal.length - 1 - i] * Math.pow(8, i);
    }
    return decimal;
}

function hexadecimalADecimal(hex) {
    const hexDigits = '0123456789ABCDEF';
    let decimal = 0;
    hex = hex.toUpperCase().replace(/^0x/, '');
    for (let i = 0; i < hex.length; i++) {
        decimal += hexDigits.indexOf(hex[hex.length - 1 - i]) * Math.pow(16, i);
    }
    return decimal;
}

function decimalABinario(decimal) {
    let binario = '';
    while (decimal > 0) {
        binario = (decimal % 2) + binario;
        decimal = Math.floor(decimal / 2);
    }
    return binario || '0';
}

function decimalAOctal(decimal) {
    let octal = '';
    while (decimal > 0) {
        octal = (decimal % 8) + octal;
        decimal = Math.floor(decimal / 8);
    }
    return octal || '0';
}

function decimalAHexadecimal(decimal) {
    const hexDigits = '0123456789ABCDEF';
    let hex = '';
    while (decimal > 0) {
        hex = hexDigits[decimal % 16] + hex;
        decimal = Math.floor(decimal / 16);
    }
    return '0x' + (hex || '0');
}

export function convertir(valor, desde, hasta) {
    let decimal;
    switch (desde) {
        case "Decimal":
            decimal = parseInt(valor, 10);
            break;
        case "Binario":
            decimal = binarioADecimal(valor);
            break;
        case "Octal":
            decimal = octalADecimal(valor);
            break;
        case "Hexadecimal":
            decimal = hexadecimalADecimal(valor);
            break;
        default:
            return "Error";
    }

    switch (hasta) {
        case "Decimal":
            return decimal.toString(10);
        case "Binario":
            return decimalABinario(decimal);
        case "Octal":
            return decimalAOctal(decimal);
        case "Hexadecimal":
            return decimalAHexadecimal(decimal);
        default:
            return "Error";
    }
}