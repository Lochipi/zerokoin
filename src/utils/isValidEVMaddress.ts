export function isValidEVMAddress(address: string): boolean {
  if (!address || typeof address !== "string") {
    return false;
  }
  if (!address.toLowerCase().startsWith("0x")) {
    return false;
  }
  if (address.length !== 42) {
    return false;
  }
  // Check for valid characters (alphanumeric)
  try {
    parseInt(address.slice(2), 16); // Remove prefix and parse as hexadecimal
  } catch (error) {
    return false;
  }

  return true;
}
