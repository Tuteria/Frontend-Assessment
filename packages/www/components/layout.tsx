import { FunctionComponent } from 'react';
import Meta from './meta';

const Layout: FunctionComponent = ({children}) => (
    <div className="layout">
      <Meta/>
      {children}
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #F3EEE9;
        }

        @media (min-width: 800px) {
          .layout {
            align-items: center
          }
        }
      `}</style>
    </div>
);

export default Layout;
