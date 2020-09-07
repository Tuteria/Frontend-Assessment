import { FunctionComponent } from 'react';

const Container: FunctionComponent = ({children}) => (
    <main className="grid">
      {children}
      <style jsx>{`
        .grid {
          margin: 1rem 1rem 0 1rem;

        }

        @media (min-width: 800px) {
          .grid {
            width: 800px;
          }
        }
      `}</style>
    </main>
);

export default Container;




