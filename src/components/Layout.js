import React from 'react';

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

function Layout({loanding, children}) {
	return (
        <div className="layout-style">
            <LoadingOverlay active={loanding} spinner={<BounceLoader />}>
                {children}
            </LoadingOverlay>
        </div>
	)
}

export default Layout;