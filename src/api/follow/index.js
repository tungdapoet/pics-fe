import {post} from '../../helpers/api_helpers'

export const handleFollow = (id, action) => post(`/relationship/Follow/${id}?action=${action}`)