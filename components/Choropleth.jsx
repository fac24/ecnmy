
// async function choroGetter() {
// const mapPostResponse = await fetch('https://api.datawrapper.de/v3/charts', {
//     method: 'POST',
//     headers: {
//         'Authorization': process.env.API_KEY,
//         'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//         'title': 'test choropleth',
//         'type': 'd3-lines',
//         'lastEditStep': 3
//     })
// })
// console.log(mapPostResponse);
//     const postResponse = await fetch('https://api.datawrapper.de/v3/charts', {
//         method: 'POST',
//         headers: {
//             'Authorization': process.env.API_KEY,
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             'title': 'blah',
//             'type': 'd3-lines',
//             'lastEditStep': 3
//         })
//     })
//     const postJson = await postResponse.json();
//     console.log(postJson);
// }


export default function Choropleth() {
    choroGetter()
    return (<>
        <div>maps</div>
    </>)
}