export class ApiErrors {
    constructor(errors) {
        this.errors = errors;
    }
}

export class ApiSuccesses {
    constructor(successes) {
        this.successes = successes;
    }
}

/**
 *
 * @param {string} endpoint
 * @param {object} options
 */
export async function apiFetch(endpoint, options = {}) {
    options = {
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
        ...options
    }

    if (options.body !== null && typeof options.body === 'object' && !(options.body instanceof FormData)) {
        options.body = JSON.stringify(options.body);
        options.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch('http://localhost:5000/api/v1' + endpoint, options);

    if (response.status === 204) {
        return null;
    }

    const responseData = await response.json();

    if (response.ok) {
        if (responseData.successes) {
            throw new ApiSuccesses(responseData.successes);
        }

        return responseData;

    } else {
        if (responseData.errors) {
            throw new ApiErrors(responseData.errors);
        }
    }
}