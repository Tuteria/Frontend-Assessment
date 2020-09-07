import { FunctionComponent } from 'react';
import Head from 'next/head';

const Meta: FunctionComponent = ({children}) => (
      <Head>
        <title>Notes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
);

export default Meta;
