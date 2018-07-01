import { SAVE_COMMENT } from './types';

// action creator:
export function saveComment(comment){
    return {
        type: SAVE_COMMENT,
        payload: comment
    }

}