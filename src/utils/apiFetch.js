export class ApiErrors {
    constructor(errors) {
        this.errors = errors
    }
} 

export async function apiFetch(endpoint,options = {}) {

    const response = await fetch('http://localhost:8080/ApiRest'+endpoint, {
        //mode: 'no-cors', //solution to the cors policy no Access-..-Origin
        headers: {
            Accept: 'application/json',
        },
        ...options
    })

    const responseData = await response.json()

    if(response.ok) {
        return responseData
    } else if(responseData.errors) {
        throw new ApiErrors(responseData.errors)
    }

}