/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    try{
        let song_name = url.searchParams.get('q')
        let res_text = await fetch(`https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=${song_name}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            }
        )

        res_text = await res_text.json()
        console.log(res_text)
        // res_text = res_text['songs']['data']
        
        return new Response(JSON.stringify(res_text));
    }catch(er){
        return new Response(JSON.stringify({}));
    }
    
};