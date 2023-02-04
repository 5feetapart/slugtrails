import fs from 'fs';

const data = fs.readFileSync('data.json', 'utf8');
const out = [];
for (const item of JSON.parse(data)) {
	item.tags = item.tags.split(',').map((tag) => tag.trim());
	out.push(item);
}

fs.writeFileSync('out.json', data, 'utf8');
