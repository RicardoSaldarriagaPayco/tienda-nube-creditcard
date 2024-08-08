import { userRepository } from "../../repository";
import { LoginRequestInterface } from "../../features/auth";

/**
 * In production mode, the back-end needs to implement its own authentication for the API.
 */
class AuthService {
    async login(loginRequest: LoginRequestInterface) {
        return await userRepository.findFirst(loginRequest);
    }
}

export default new AuthService();