import fs from 'fs';

const data = fs.readFileSync('data.json', 'utf8');

for (const item of JSON.parse(data)) {
	item.tags = item.tags.split(',').map((tag) => tag.trim());
}

fs.writeFileSync('out.json', JSON.stringify(data, null, 2), 'utf8');
