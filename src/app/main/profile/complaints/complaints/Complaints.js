import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import ComplaintsHeader from './ComplaintsHeader';
import ComplaintsTable from './ComplaintsTable';
import reducer from '../store/reducers';

function Complaints()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ComplaintsHeader/>
            }
            content={
                <ComplaintsTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('complaints', reducer)(Complaints);
