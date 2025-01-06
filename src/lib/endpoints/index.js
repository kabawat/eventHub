import SECRETS from "../../configs/env.configs"
const URLs = {
    BASE_URL: SECRETS?.API_URL,
    LOGIN: `/api/login`,
    REGISTER: `/api/register`,
    EVENTS: `/events/`,
    PROFILE: `/api/profile`,
}
export default URLs
