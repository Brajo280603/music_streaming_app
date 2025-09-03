    import CryptoJS from 'crypto-js';

export function decryptUrl(url, quality = 'Extreme') {  // Default quality to 'Extreme'
  const key = CryptoJS.enc.Utf8.parse('38346591'); // 8-byte key
  const encUrl = url.trim();

  // Decryption logic
  const decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(encUrl),
    },
    key,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  let decUrl = decrypted.toString(CryptoJS.enc.Utf8);

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

  // Sanitize the URL to prevent errors
  decUrl = decUrl.replace(/[^a-zA-Z0-9.\-_~:/?#[\]@!$&'()*+,;=]/g, '');

  decUrl = decUrl.replace("_96.mp4", qualityOptions[quality]);

  let decUrls = {};
  for (const [key, value] of Object.entries(qualityOptions)) {
    decUrls[key] = decUrl.replace(qualityOptions[quality], value);
  }

  return decUrls;
}
