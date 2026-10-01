import express from 'express';
import { pathToFileURL } from 'node:url';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  return res.json({ message: 'Hello, World! From CI/CD' });
});

app.get('/health', (req, res) => {
  return res.json({ status: 'UP' });
});

app.get('/api', (req, res) => {
  return res.json({ message: 'This is the API endpoint' });
});

export default app;

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
