export function toEnumValue<T>(value: T, name: keyof T | string): typeof value[keyof typeof value] | undefined {
	if (name) {
		return value[name as keyof T];
	}
}