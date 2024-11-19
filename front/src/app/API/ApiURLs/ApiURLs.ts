interface ApiUrlsIn {
    readonly USER: string,
    readonly ACTUALITY: string,
    readonly CLIENT: string,
    readonly GUIDE: string,
}

const url = "http://localhost:8000/";

const ApiUrls: ApiUrlsIn = {
    USER : url + "api/register",
    ACTUALITY : url + "api/actualites",
    CLIENT : url + "api/clients",
    GUIDE : url + "api/guides",
}

export default ApiUrls;