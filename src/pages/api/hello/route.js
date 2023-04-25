export async function GET(request) {
    let response = await fetch('http://127.0.0.1:8080/api/test/hello')
    return response;
}
