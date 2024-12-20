export function numericInputValidate(value) {
  if (!value || value.trim() === "") {
    return "입력값이 비어있습니다.";
  }

  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return "숫자만 입력 가능합니다.";
  }

  if (numericValue <= 0) {
    return "입력값은 0보다 커야 합니다.";
  }

  if (value.startsWith("0") && value.length > 1) {
    return "입력값은 0으로 시작할 수 없습니다.";
  }

  return null;
}
