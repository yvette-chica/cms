/*
    For some reason this is not working on the quotes page, only index
*/

import { withRouter } from 'next/router';
import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

function Quotes({router}) {
    const { query } = router;
  console.log('router', router);
  const { data, error } = useSWR(
    `/api/posts`,
    fetcher
  );
  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  console.log('data', data);
  const author = 'author';
  let quote = 'quote';

  if (!data) quote = 'Loading...';
  if (error) quote = 'Failed to fetch the quote.';

  return (
    <main className="center">
      <div className="quote">{quote}</div>
      {author && <span className="author">- {author}</span>}

      <style jsx>{`
        main {
          width: 90%;
          max-width: 900px;
          margin: 300px auto;
          text-align: center;
        }
        .quote {
          font-family: cursive;
          color: #e243de;
          font-size: 24px;
          padding-bottom: 10px;
        }
        .author {
          font-family: sans-serif;
          color: #559834;
          font-size: 20px;
        }
      `}</style>
    </main>
  );
}
export default withRouter(Quotes);