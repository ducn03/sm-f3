import { env } from '$lib/config/env' 


export const API_CONSTANT = {
    AUTHENTICATION: {
        HEADER: {
            NAME: {
                Authorization: 'Authorization',
                ContentType: 'Content-Type',
            },
            VALUE: {
                Bearer: 'Bearer ',
                ApplicationJson: 'application/json'
            },
        }
    },
    COOKIE: {
        NAME: {
            Token: 'userinfo'
        },
        cookieMaxAge: {
            // 1 giờ (tính bằng giây)
            shortTerm: 60 * 60,
            // 30 ngày (tính bằng giây)
            longTerm: 30 * 24 * 60 * 60
        }
    },
    ERROR: {
        CODE: {
            SystemError: 500,
            NotFound: 404,
            Forbidden: 403,
            Unauthorized: 401
        }
    },
    REQUEST: {
        // 30 giây
        timeout: 30000
    }
};