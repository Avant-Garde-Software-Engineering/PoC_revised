export async function GET(request, { params }) {
    const data = `[
        {
            "name": "mag1",
            "length": 5,
            "height": 2,
            "depth": 1
        },
        {
            "name": "mag2",
            "length": 1,
            "height": 0.5,
            "depth": 3
        }
    ]`

    const obj = JSON.parse(data)
    let response = null
    obj.forEach(element => {
        if(element.name === params.whs)
            response = element
    });

    return new Response(JSON.stringify(response))
}