import uploadImage from '../lib/uploadImage.js';
import {sticker} from '../lib/sticker.js';
const handler = async (m, {conn, text}) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    const img = await q.download();
    const url = await uploadImage(img);
    const scircle = global.API('dzx', '/api/canvas/circle', {url});
    const stiker = await sticker(null, scircle, global.packname, global.author);
    conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, {asSticker: true});
  } catch (e) {
    m.reply('*[❗خطأ❗] قم برد على الصوره لتحويلها لملصق دائري*');
  }
};
handler.command = /^ستيك|دائري$/i;
export default handler;
/* `https://api.dhamzxploit.my.id/api/canvas/circle?url=${url}` */
