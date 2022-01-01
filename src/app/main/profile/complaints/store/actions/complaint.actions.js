import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_Complaint = '[E-COMMERCE APP] GET complaint';
export const SAVE_Complaint = '[E-COMMERCE APP] SAVE complaint';

export function getcomplaint(params)
{
    const request = axios.get('/api/e-commerce-app/complaint', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_Complaint,
                payload: response.data
            })
        );
}

export function savecomplaint(data)
{
    const form = new FormData();
    form.append("description", data.description);
    form.append("attachment", data.attachment);
    const request = fetch('/api/complaints/addcomplaint', {
        method: 'POST',
        body: form
      })
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'complaint Saved'}));

                return dispatch({
                    type   : SAVE_Complaint,
                    payload: response.data
                })
            }
        );
}

export function newcomplaint()
{
    const data = {
        id              : FuseUtils.generateGUID(),
        name            : '',
        handle          : '',
        description     : '',
        categories      : [],
        tags            : [],
        images          : [],
        priceTaxExcl    : 0,
        priceTaxIncl    : 0,
        taxRate         : 0,
        comparedPrice   : 0,
        quantity        : 0,
        sku             : '',
        width           : '',
        height          : '',
        depth           : '',
        weight          : '',
        extraShippingFee: 0,
        active          : true
    };

    return {
        type   : GET_Complaint,
        payload: data
    }
}
