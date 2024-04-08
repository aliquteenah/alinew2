import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const handler = async (m, { conn, text }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    const img = await q.download();
    let apikey = 'DZLpw7k8kze96grWBDG5yb6A' //replace with your apikey if its dead
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', img, 'file.jpg');

    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': apikey,
      },
      responseType: 'arraybuffer',
      encoding: null,
    });

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const imageData = response.data;

    fs.writeFileSync('no-bg.png', imageData);

    // Add the caption to the image
    const caption = '*╮ ───═┅─┅─┅═─── ╭*      🇾🇪_ *الجنہـــــرال* \n*تم مسح خلفية الصوره* 😎. \n*╯ ───═┅─┅─┅═─── ╰*♥\ninstagram.com/ali_quteenah';
    conn.sendFile(m.chat, 'no-bg.png', '', caption, m);
  } catch (e) {
    console.error(e);
    m.reply('هذا الامر خاص بحذف خلفية اي صورة \n ارسل للبوت اي صورة تريد حذف خلفيتها ثم قم بالاشارة للصورة واكتب \n*.مسح*');
  }
};
handler.command = /^rg3|مسح$/i;
export default handler;
