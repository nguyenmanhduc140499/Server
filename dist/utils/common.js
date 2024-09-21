"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicate = exports.validateProductInput = void 0;
function hasDuplicates(arr) {
    const uniqueElements = new Set();
    for (const element of arr) {
        if (uniqueElements.has(element)) {
            return true; // Duplicate found
        }
        uniqueElements.add(element);
    }
    return false; // No duplicates
}
function validateProductInput(inputData, existProduct) {
    if (inputData.collections.length) {
        inputData.collections = [
            ...new Set(inputData.collections.concat(existProduct.collections)),
        ];
    }
    return inputData;
}
exports.validateProductInput = validateProductInput;
function checkDuplicate(input) {
    let isDuplicate = false;
    let duplicateField = [];
    if (input.collections) {
        isDuplicate = hasDuplicates(input.collections);
        if (isDuplicate) {
            duplicateField.push("Collection");
            isDuplicate = false;
        }
    }
    if (input.tags) {
        isDuplicate = hasDuplicates(input.tags);
        if (isDuplicate) {
            duplicateField.push("Tag");
            isDuplicate = false;
        }
    }
    if (input.sizes) {
        isDuplicate = hasDuplicates(input.sizes);
        if (isDuplicate) {
            duplicateField.push("Size");
            isDuplicate = false;
        }
    }
    if (input.colors) {
        isDuplicate = hasDuplicates(input.colors);
        if (isDuplicate)
            duplicateField.push("Color");
    }
    return duplicateField;
}
exports.checkDuplicate = checkDuplicate;
//# sourceMappingURL=common.js.map