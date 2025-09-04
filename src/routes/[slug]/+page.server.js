import crypto from 'crypto'

export async function load({params}) {
    // console.log(params.slug)
    let id = params.slug;
    let res_text = await fetch(`https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${id}`,
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }
    )

    res_text = await res_text.json()

    res_text = res_text[id]
    // console.log(res_text)

    // res_text['urls'] = decryptUrl(res_text['encrypted_media_url'])

    // console.log(res_text)
    return res_text;
}



function decryptUrl(url, quality = 'Extreme') {  // Default quality to 'Extreme'
  const key = Buffer.from('38346591', 'utf-8'); // 8-byte key
  const decipher = crypto.createDecipheriv('DES-ECB', key, null); // ECB mode does not require IV
  decipher.setAutoPadding(true); // Enable PKCS5 PaddingPadding(true);
    
  const encUrl = Buffer.from(url.trim(), 'base64'); // Decode Base64 directly using Buffer
  let decUrl = Buffer.concat([decipher.update(encUrl), decipher.final()]).toString('utf-8');

  // Audio quality mapping
  const qualityOptions = {
      'Low': '_12.mp4',
      'Fair': '_48.mp4',
      'Good': '_96.mp4',
      'Best': '_160.mp4',
      'Extreme': '_320.mp4',
  };

  if (!(quality in qualityOptions)) {
      throw new Error(`Invalid quality option: ${quality}`);
  }

  decUrl = decUrl.replace("_96.mp4", qualityOptions[quality]); // Apply selected quality

  let decUrls = {};
  for (const [key, value] of Object.entries(qualityOptions)) {
      decUrls[key] = decUrl.replace(qualityOptions[quality], value);
  }

  return decUrls;
}