import { CreateProductInput, UpdateProductInput } from "../Input/productInput";
import { Product } from "../model/product";

function hasDuplicates(arr: string[]): boolean {
    const uniqueElements = new Set<string>();

    for (const element of arr) {
        if (uniqueElements.has(element)) {
            return true; // Duplicate found
        }
        uniqueElements.add(element);
    }

    return false; // No duplicates
}

export function validateProductInput(
    inputData: UpdateProductInput,
    existProduct: Product
) {

    if (inputData.collections.length) {
        inputData.collections = [
            ...new Set(inputData.collections.concat(existProduct.collections)),
        ];
    }
    return inputData
}

export function checkDuplicate(input: CreateProductInput) {
    let isDuplicate: Boolean = false;
    let duplicateField: string[] = [];

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
        if (isDuplicate) duplicateField.push("Color");
    }
    return duplicateField;
}
