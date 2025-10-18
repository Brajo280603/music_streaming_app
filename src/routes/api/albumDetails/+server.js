

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    // let id = params.slug;
    let link = url.searchParams.get('id');

    let album_id = await get_album_id(link)

    let res_text = await fetch(`https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&albumid=${album_id}`,
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }
    )


    res_text = await res_text.json()

    // res_text = res_text[id]
    return new Response(JSON.stringify(res_text));
};


async function get_album_id(link){
    let album_id = await fetch(`${link}`,
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }
    )
    album_id = await album_id.text()

    try{
        album_id = album_id.split(`"album_id":"`)[1].split(`"`)[0]
        console.log(album_id)
    }catch(er){
        album_id = album_id.split(`"page_id","`)[1].split(`","`)[0]
        console.log(album_id)
    }


    return album_id
}