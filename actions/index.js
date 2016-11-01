export const acceptIncident = (id) => {
    return {
        type: 'ACCEPT_INCIDENT',
        id: id
    }
};


export const rejectIncident = (id) => {
    return {
        type: 'REJECT_INCIDENT',
        id: id
    }
};

export const resolveIncident = (id) => {
    return {
        type: 'RESOLVE_INCIDENT',
        id: id
    }
};

export const uploadImage = (id, image) => {
    return {
        type: 'UPLOAD_IMAGE',
        id: id,
        image: image
    }
};


