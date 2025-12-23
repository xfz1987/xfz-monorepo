import { tuplify } from './uitls';

/**
 * 提供localStorage操作的工具函数集合
 *
 * @param name - localStorage中的键名
 * @returns 返回一个元组 [get, set, remove]，包含读取、设置和删除三个操作函数
 *
 * @example
 * ```tsx
 * function StorageComponent() {
 *   const [getToken, setToken, removeToken] = useLocalStorage2('authToken');
 *
 *   const handleLogin = () => {
 *     setToken('abc123');
 *   };
 *
 *   const handleLogout = () => {
 *     removeToken();
 *   };
 *
 *   const token = getToken();
 *   return <div>Token: {token}</div>;
 * }
 * ```
 */
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
