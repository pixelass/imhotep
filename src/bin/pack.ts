import babel from "./babel";
import clean from "./clean";
import types from "./types";

export const pack = async (): Promise<any> => {
	await clean();
	await babel(false);
	return types(false);
};

export default pack;
