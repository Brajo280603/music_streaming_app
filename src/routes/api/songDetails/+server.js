/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    // let id = params.slug;
    let id = url.searchParams.get('id');
    let res_text = await fetch(`https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${id}`,
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }
    )

    res_text = await res_text.json()

    res_text = res_text[id]
    return new Response(JSON.stringify(res_text));
};