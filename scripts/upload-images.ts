import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const BASE_DIR = '/Users/UNCBootcamp/career/NEW-AFRO-TAROT/DEV/afro-tarot-app/public/images';
const FOLDERS = ['moon-phases', 'orishas', 'tarot-cards'];
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_JSON = path.join(__dirname, 'cards.json');

cloudinary.config({
  cloud_name: 'djg9rvq12',
  api_key: '964964499277893',
  api_secret: 'vphNssQHU5wBlNInKMnwdi9P5sw',
});

(async () => {
  const results = [];

  for (const folder of FOLDERS) {
    const folderPath = path.join(BASE_DIR, folder);
    const files = fs.readdirSync(folderPath).filter(file =>
      /\.(png|jpe?g|webp)$/i.test(file)
    );

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const baseName = path.parse(file).name;

      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `afro-tarot/${folder}`,
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        });

        results.push({
          name: baseName,
          type: folder,
          url: result.secure_url,
        });

        console.log(`✅ Uploaded ${folder}/${file}`);
      } catch (err) {
        console.error(`❌ Failed to upload ${folder}/${file}:`, err);
      }
    }
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(results, null, 2));
  console.log(`\n📄 cards.json created at: ${OUTPUT_JSON}`);
})();
