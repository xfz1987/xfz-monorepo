import { tuplify } from './uitls';

export const useLocalStorage2 = (name: string) => {
	const getLocalStorage = (): number | string | Record<string, any> | null => {
		const local = localStorage.getItem(name);

		if (local) {
			return JSON.parse(local);
		}

		return null;
	};

	const setLocalStorage = (item: number | string | Record<string, any>) => {
		localStorage.setItem(name, JSON.stringify(item));
	};

	const removeLocalStorage = () => {
		return localStorage.removeItem(name);
	};

	// return [getLocalStorage, setLocalStorage, removeLocalStorage] as const;
	return tuplify(getLocalStorage, setLocalStorage, removeLocalStorage);
};

// 使用实例
// const [getLocalStorage, setLocalStorage, removeLocalStorage] = useLocalStorage('test');
// const t = getLocalStorage();
// setLocalStorage('1');
// removeLocalStorage();
